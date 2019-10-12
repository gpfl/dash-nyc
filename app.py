from flask import Flask, render_template
import pandas as pd

# Data imports
nyc_data = pd.read_csv('data/AB_NYC_2019.csv')

# Flask app
app = Flask(__name__, template_folder="")

@app.route('/')
def index():
    return render_template("index.html", data=nyc_data)

if __name__ == '__main__':
    app.run(debug=True)