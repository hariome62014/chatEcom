from flask import Flask, request, jsonify
from chatbot_logic import handle_query  # Updated to reflect the refactored logic

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        query = data.get('query', '')
        session_id = data.get('session_id', 'default_session')  # Optional session ID for memory
        response = handle_query(query, session_id=session_id)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
