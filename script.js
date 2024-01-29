// Create a MutationObserver instance
const observer = new MutationObserver(updateButtonPosition);

// Start observing the textarea for attribute changes
observer.observe(document.getElementById('output'), { attributes: true });

function updateButtonPosition() {
    const output = document.getElementById('output');
    const button = document.getElementById('copyButton');

    // Update the button's position
    button.style.top = (output.offsetTop + 10) + 'px';
    button.style.right = (output.offsetParent.offsetWidth - output.offsetWidth - output.offsetLeft + 10) + 'px';
}

async function getComments() {
    // Get the URL from the input field
    const url = document.getElementById('url').value + '.json';
    
    // Fetch the JSON data from the Reddit post
    const response = await fetch(url);
    const data = await response.json();
    
    // Get the list of comments
    const comments = data[1].data.children;
    
    let markdownOutput = '';
    
    // Recursive function to handle nested comments
    function parseComment(comment) {
        if (comment.kind === 't1') {  // t1 signifies a comment
            const author = comment.data.author;
            const body = comment.data.body;
            
            // Convert to Markdown (here, we're just adding bold formatting to the author name)
            markdownOutput += `**${author}** : ${body}\n\n`;
            
            // Check for replies to the comment
            if ('replies' in comment.data && comment.data.replies !== '') {
                for (let reply of comment.data.replies.data.children) {
                    parseComment(reply);
                }
            }
        }
    }
    
    // Loop through the comments
    for (let comment of comments) {
        parseComment(comment);
    }
    
    // Output the comments in the textarea
    document.getElementById('output').value = markdownOutput;
}

function copyToClipboard() {
    // Select the text
    document.getElementById('output').select();
    // Execute the "copy" command
    document.execCommand('copy');
    // Show tooltip
    var tooltip = document.createElement("span");
    tooltip.innerText = "Copied to clipboard";
    tooltip.style.position = "absolute";
    tooltip.style.top = "10px";
    tooltip.style.right = "40px";
    tooltip.style.backgroundColor = "#50fa7b";
    tooltip.style.color = "#282a36";
    tooltip.style.padding = "5px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.transition = "opacity 0.3s";
    document.getElementById('container').appendChild(tooltip);
    setTimeout(function() {
        tooltip.style.opacity = "0";
    }, 2000);
    setTimeout(function() {
        document.getElementById('container').removeChild(tooltip);
    }, 3000);
}
