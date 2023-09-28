from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the model from .joblib file
with open("NearestNeighbors_clf.joblib", "rb") as file:
    loaded_model = joblib.load(file)

# load the database from .csv file
df = pd.read_csv("../database_Leo.csv")

with open("SentenceTransformer_model.joblib", "rb") as file:
    sentence_model = joblib.load(file)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    # extract input data from the request
    star_rating = float(request.form["star_rating"])
    price = float(request.form["price"])
    user_input_str = str(request.form["user_input_str"])

    # print variables to see if they are picked up correctly from user input
    print(star_rating, price, user_input_str)

    # create embeddings for user input
    user_input_emb = sentence_model.encode(user_input_str).reshape(1, -1)

    # make prediction based on user input
    distances, indices = loaded_model.kneighbors(user_input_emb)
    # flatten indices array to use as index in dataframe
    indices = indices.flatten()

    # get ID's to return
    recs = list(df.iloc[indices]["reference"])

    return jsonify({"recommendations": recs})


if __name__ == "__main__":
    app.run(debug=True)
