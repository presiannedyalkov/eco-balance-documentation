- Description: Allows you to run code snippets directly within your Obsidian notes.
- Setup: Install the plugin, then use code blocks with the appropriate language identifier. Add the "run" parameter to make the code executable. Install Node.js to system which runs the code.
# Demo
## JS
### Test console log
```javascript
console.log('Test');
```

### Test home assistant notification

> Note: This works but with some bugs - sometimes the run button is not shown, the script hangs etc. If this happens run `location.reload()` in the console.

```js
const https = require('https');

function makeRequest() {
    const options = {
        hostname: 'homeassistant.local',
        port: 8123,
        path: '/api/webhook/-Dz0iCV7cl7uvVFknKHgZrAhs',
        method: 'GET',
        rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Response status:', res.statusCode);
            console.log('Response headers:', JSON.stringify(res.headers, null, 2));
            console.log('Response data:', data);

            if (data.trim() === '') {
                console.log('Result:', JSON.stringify({ status: 'success', message: 'Webhook triggered successfully' }, null, 2));
            } else {
                try {
                    console.log('Result:', JSON.stringify(JSON.parse(data), null, 2));
                } catch (error) {
                    console.log('Result:', JSON.stringify({ status: 'success', message: 'Webhook triggered successfully', data: data }, null, 2));
                }
            }
            
            console.log('EXECUTION_COMPLETE');
        });
    });

    req.on('error', (error) => {
        console.error('Error:', error.message);
        console.log('EXECUTION_COMPLETE');
    });

    req.end();
}

makeRequest();
```

## Python
### Test console log
```python
print("Hello, World!")
```

---

## 🔗 Related

**Part of:** [[1_Projects]] > Obsidian Plugins

**Related Plugins:**
- [[Calendar]] - Calendar view plugin
- [[Tag Wrangler]] - Tag management
- [[Natural Language Dates]] - Date insertion
- [[Dataview]] - Data querying plugin

**See Also:**
- [[1_Projects]] - Projects hub