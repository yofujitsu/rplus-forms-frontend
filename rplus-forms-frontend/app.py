from flask import Flask, render_template, request, jsonify

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/post', methods=['POST'])
def handle_form():
    data = request.json  # Получение данных из POST-запроса

    # Обработка данных (замените на ваш код обработки)
    print(data)
    # Возвращение ответа на запрос
    return jsonify({'success': True, 'message': 'Данные успешно получены и обработаны'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
