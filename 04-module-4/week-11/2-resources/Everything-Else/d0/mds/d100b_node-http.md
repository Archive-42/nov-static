# HTTP Full-Stack Objectives

Understanding how Node.js handles incoming HTTP requests using the
`IncomingMessage` and `ServerResponse` objects provide a strong foundation of
being able to predict problems when you use frameworks to ease the burden of
writing Web applications. When you complete the associated material for this
lesson, you should be able to:

* Identify the five parts of a URL
* Identify at least three protocols handled by the browser
* Use an `IncomingMessage` object to
  * access the headers sent by a client (like a Web browser) as part of the HTTP
    request
  * access the HTTP method of the request
  * access the path of the request
  * access and read the stream of content for requests that have a body
* Use a `ServerResponse` object to
  * write the status code, message, and headers for an HTTP response
  * write the content of the body of the response
  * properly end the response to indicate to the client (like a Web browser)
    that all content has been written
