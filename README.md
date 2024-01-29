# Convert Reddit Comments to Markdown

Fetches comments from any Reddit thread and converts them into Markdown format. 

## Usage

### Online

You can access the tool online at `xryul.github.io/reddit-to-markdown/`.

Simply paste reddit post URL and click "Get Comments" to convert all reddit comments inside that thread into Markdown. 

### Locally
#### Dependencies
```
pip install requests
```

Running locally will create a new Markdown file inside parent directory. With each new markdown file being name with Post Title.

You can simply run it locally via `main.py`. Simply drag and drop `main.py` into terminal, it should prompt you for URL. Paste reddit post URL to fetch all comments from the thread and convert them into Markdown.