import requests
import json

def get_comments_in_markdown():
    # Ask for the URL
    url = input("Please enter the URL of the Reddit post: ")
    
    # Add .json to the URL
    url_json = url + '.json'
    
    # Send a GET request
    response = requests.get(url_json, headers = {'User-agent': 'Mozilla/5.0'})
    
    # Load the JSON data from the response
    data = json.loads(response.text)
    
    # Get the list of comments
    comments = data[1]['data']['children']
    
    markdown_output = ""
    
    # Recursive function to handle nested comments
    def parse_comment(comment):
        nonlocal markdown_output
        if comment['kind'] == 't1':  # t1 signifies a comment
            author = comment['data']['author']
            body = comment['data']['body']
            
            # Convert to Markdown (here, we're just adding bold formatting to the author name)
            markdown_output += f"**{author}** : {body}\n\n"
            
            # Check for replies to the comment
            if 'replies' in comment['data'] and comment['data']['replies'] != '':
                for reply in comment['data']['replies']['data']['children']:
                    parse_comment(reply)
    
    # Loop through the comments
    for comment in comments:
        parse_comment(comment)
    
    # Get the post title for the filename
    post_title = data[0]['data']['children'][0]['data']['title']
    
    # Replace any characters in the title that are not allowed in filenames
    filename = "".join(c for c in post_title if c.isalnum() or c in (' ',)).rstrip() + '.md'
    
    # Write the output to a Markdown file
    with open(filename, 'w') as f:
        f.write(markdown_output)

# Run the function
get_comments_in_markdown()
