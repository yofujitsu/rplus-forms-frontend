from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/обработчик_формы', methods=['POST'])
def handle_form():
    data = request.json  # Получение данных из POST-запроса

    # Обработка данных (замените на ваш код обработки)

    # Возвращение ответа на запрос
    return jsonify({'success': True, 'message': 'Данные успешно получены и обработаны'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
