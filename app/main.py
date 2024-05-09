from flask import Flask, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/electric-field', methods=['GET'])
def electric_field():
    return render_template('electric_field.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int("5000"), debug=True)
