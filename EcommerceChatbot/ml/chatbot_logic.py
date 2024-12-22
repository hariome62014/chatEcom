# -*- coding: utf-8 -*-
"""chatbot_logic.py"""

import pandas as pd
from langchain_core.documents import Document
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain_astradb import AstraDBVectorStore
from langchain_groq import ChatGroq
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import MessagesPlaceholder
from langchain.chains import create_history_aware_retriever
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory

# Initialize Variables
GROQ_API = ""
ASTRA_DB_API_ENDPOINT = ""
ASTRA_DB_APPLICATION_TOKEN = ""
ASTRA_DB_KEYSPACE = ""
HF_TOKEN = ""

# Load Dataset
def load_and_prepare_data(file_path):
    data = pd.read_csv(file_path)
    data = data[["product_title", "review"]]
    product_list = [
        {"product_name": row["product_title"], "review": row["review"]}
        for _, row in data.iterrows()
    ]

    docs = [
        Document(page_content=obj["review"], metadata={"product_name": obj["product_name"]})
        for obj in product_list
    ]
    return docs

# Initialize Embeddings and Vector Store
def setup_vector_store(docs):
    embeddings = HuggingFaceInferenceAPIEmbeddings(api_key=HF_TOKEN, model_name="BAAI/bge-base-en-v1.5")
    vstore = AstraDBVectorStore(
        embedding=embeddings,
        collection_name="EcommerceChatbot",
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        token=ASTRA_DB_APPLICATION_TOKEN,
        namespace=ASTRA_DB_KEYSPACE,
    )
    vstore.add_documents(docs)
    return vstore

# Define Chain
def setup_chain(vstore):
    model = ChatGroq(groq_api_key=GROQ_API, model="llama-3.1-70b-versatile", temperature=0.5)
    retriever = vstore.as_retriever(search_kwargs={"k": 3})

    PRODUCT_BOT_TEMPLATE = """
        Your ecommerce bot is an expert in product recommendations and customer queries.
        Ensure your answers are relevant to the product context and concise.

        CONTEXT:
        {context}

        QUESTION: {input}

        YOUR ANSWER:
        """

    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", PRODUCT_BOT_TEMPLATE),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}")
        ]
    )

    question_answer_chain = create_stuff_documents_chain(model, qa_prompt)
    chain = create_retrieval_chain(retriever, question_answer_chain)
    return chain

# Define Memory
store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

# Initialize Chatbot
docs = load_and_prepare_data("dataset.csv")
vstore = setup_vector_store(docs)
chain = setup_chain(vstore)

chain_with_memory = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
)

# Handle Query
def handle_query(query, session_id="default_session"):
    response = chain_with_memory.invoke(
        {"input": query},
        config={"configurable": {"session_id": session_id}},
    )
    return response["answer"]
