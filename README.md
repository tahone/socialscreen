# Socialscreen info display

To compile and run:

```
docker build -t node-socialscreen .
docker run -p 3000:3000 -p3001:3001 node-socialscreen
````

You may need to edit the following files to point to your Docker IP instead of localhost.

```
package.json
src/server/index.js
src/Views/Screen/index.jsx
```
