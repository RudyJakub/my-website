from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/canvas', methods=['GET'])
def canvas():
    return render_template('canvas.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int("5000"), debug=True)

