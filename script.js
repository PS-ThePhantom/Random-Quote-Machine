
class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuotes: [],
      currentAuthor: "",
      currentQuote: ""
    };
    this.randomQuote = this.randomQuote.bind(this);
  }

  randomQuote() {
    const currentQuote = this.state.allQuotes[
      Math.floor(Math.random() * this.state.allQuotes.length)
    ];

    this.setState(() => ({
      currentQuote: currentQuote.quote,
      currentAuthor: currentQuote.author
    }));
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState(() => ({
          allQuotes: data.quotes
        }));

        this.randomQuote();
        document.getElementById("new-quote").onclick = this.randomQuote;
      })
      .catch((err) => {
        console.log("Error loading quotes, error: ", err);
      });
  }

  render() {
    return (
      <div class="well" id="quote-box">
        <div class="quote-text">
          <i class="fa fa-solid fa-quote-left"></i>
          <span id="text">{this.state.currentQuote}</span>
          <i class="fa fa-solid fa-quote-right"></i>
        </div>
        <div class="author-text">
          <i class="fa fa-solid fa-minus"></i>
          <span id="author">{this.state.currentAuthor}</span>
          <i class="fa fa-solid fa-minus"></i>
        </div>
        <button id="new-quote">
          <i class="fa fa-random"></i>New Quote
        </button>
        <a
          id="tweet-quote"
          title="tweet this quote"
          href={
            "https://twitter.com/intent/tweet?hashtags=quotes&related=PhulusoSingo&text=" +
            encodeURIComponent(
              '"' + this.state.currentQuote + '"\n- ' + this.state.currentAuthor
            )
          }
          target="_blank"
        >
          <i class="fab fa-twitter"></i>
          Share
        </a>
      </div>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
