from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
from sentence_transformers import SentenceTransformer

app = Flask(__name__)

# Load the model from .joblib file
with open("NearestNeighbors_clf.joblib", "rb") as file:
    loaded_model = joblib.load(file)

# load the database from .csv file
df = pd.read_csv("../DL/database_Leo.csv")

# define embedding model based on all-MiniLM-L6-v2
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
model.max_seq_length = 512  # Change the length to 512

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["GET", "POST"])
def predict():
    # extract input data from the request
    # star_rating = float(request.form["star_rating"])
    # price = float(request.form["price"])
    user_input_str = str(request.form["user_input_str"])

    # create embeddings for user input
    user_input_emb = model.encode(user_input_str).reshape(1,-1)

    # make prediction based on user input
    distances, indices = loaded_model.kneighbors(user_input_emb)
    # flatten indices array to use as index in dataframe
    indices = indices.flatten()

    # get ID's to return
    recs = df.iloc[indices]["reference"]

    return jsonify({"recommendations" : recs})

if __name__ == "__main__":
    app.run(debug=True)

