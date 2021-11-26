# The Uniform Resource Locator (URL)
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [The specification](#the-specification)
- [What is this "resource" thing?](#what-is-this-resource-thing)
- [The components of a URL](#the-components-of-a-url)
  - [The "scheme" of a URL](#the-scheme-of-a-url)
  - [Stuff between the scheme and authority](#stuff-between-the-scheme-and-authority)
  - [The authority](#the-authority)
  - [The path](#the-path)
  - [The query](#the-query)
  - [The fragment](#the-fragment)
- [Reading RFCs](#reading-rfcs)
- [What you've learned](#what-youve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

We use URLs all the time. Now, it's time to really understand how they work.

From this reading, you should be able to

* Recall where to find the definition of a URL,
* Identify and recall the five components of a URL, and
* Identify properly formatted URLs

## The specification

Almost all good things that define how the Internet works has one or more things
called IETF RFCs which define how they work. There are two acronyms there:

* **IETF**: Internet Engineering Task Force
* **RFC**: Request For Comments

The IETF is an open standards organization that creates voluntary standards to
maintain and improve the usability and interoperability of the Internet. Things
like the way travels across the Internet is created an maintained by the IETF.
In particular, the _Simple Mail Transfer Protocol_ is now governed by [RFC
5321]. RFC 5321 made obsolete RFC 2821 which, in turn, made obsolete RFC 821.
The IETF is always working to make the Internet better with respect to its
growth and usage.

An RFC is a document usually created by programmers, engineers, and scientists
in the form of a memorandum. They publish the RFC for peer review. When enough
people have reviewed it, and it seems worthy of adoption, the IETF will change
its status to "Internet Standard" which means that everyone should comply with
it if they implement that standard.

The [RFC 3986], _Uniform Resource Identifier (URI): Generic Syntax_, is an
"Internet Standard". That means that software applications that use URLs need to
conform to the specification found in that document lest they be publicly shamed
by computer programmers trying to use the non-conforming software.

## What is this "resource" thing?

Well, the standard doesn't do much for you in providing a definition of this
word "resource".

> This specification does not limit the scope of what might be a resource;
> rather, the term "resource" is used in a general sense for whatever might be
> identified by a URI. Familiar examples include an electronic document, an
> image, a source of information with a consistent purpose (e.g., "today's
> weather report for Los Angeles"), a service (e.g., an HTTP-to-SMS gateway),
> and a collection of other resources. A resource is not necessarily accessible
> via the Internet; e.g., human beings, corporations, and bound books in a
> library can also be resources. Likewise, abstract concepts can be resources,
> such as the operators and operands of a mathematical equation, the types of a
> relationship (e.g., "parent" or "employee"), or numeric values (e.g., zero,
> one, and infinity).

That influence comes from one of the authors, Dr. Roy Fielding. He has some
strong ideas about how the Internet works and, much to his disappointment, it
continues to move away from his ideals.

For your purposes, a URL points to a (hopefully) accessible resource that can
be accessed, like HTML, CSS, JavaScript, and pure data in the form of JSON.

## The components of a URL

In Section 3, _Syntax Components_, of RFC 3986 contains this helpful ASCII art
graphic to show you the components of a URL.

```
  foo://example.com:8042/over/there?name=ferret#nose
  \_/   \______________/\_________/ \_________/ \__/
   |           |            |            |        |
scheme     authority       path        query   fragment
```

Here's an explanation of each of those components.

### The "scheme" of a URL

This section used to be called "the protocol", but was updated when URLs became
part of a larger family known as URIs, Uniform Resource Identifiers, which is
what RFC 3986 actually covers.

You've actually used three schemes already in class! Can you remember them?

If you replied "http" and "https", that's right! When you type an authority in
the browser, like "duckduckgo.com" or "localhost:3000", the browser _assumes_ that
you want to use HTTP, so it prepends that scheme to the authority. The browser
would then make requests to "http://duckduckgo.com" or "http://localhost:3000".

When you double click on an HTML file and it opens locally in your browser, that
is using the "file" scheme, meaning that it is looking for a file local to the
computer! You've done this countless times during this course. You may have
noticed the "file" part in the address bar. That's the scheme it used to access
local files as opposed to making an HTTP request.

This is why it was once named "protocol", because it was the protocol that the
browser would use to _locate the resource_ using a Uniform Resource Locator.

### Stuff between the scheme and authority

The standard tells us that for URLs that have an authority, the characters "://"
must exist between the scheme and the authority. That's why you have to type
those characters. You can blame Sir Tim Berners-Lee for that because he defined
it in the original RFC for this subject, RFC 1738, _Uniform Resource Locators
(URL)_.

### The authority

This part of as URL is normally the domain name of the resource that has the
resource that you're trying to access.

Sometimes it has a port number, too, like when you start a local HTTP server
with Node.js. Then, you type "http://localhost:3000". The authority is the
entire "localhost:3000". That means that, even if "http://localhost:3000" and
"http://localhost:8081" return the exact same content, they're considered to be
two different URLs to the same content.

### The path

Paths are in the first part of an HTTP request, if you recall. When you click on
a link in your browser that takes you to "https://duckduckgo.com/about", that
results in an HTTP request that begins with the following line:

```
GET /about HTTP/1.1
```

That's the path.

If the path is omitted from a URL, it is assumed to be "/".

### The query

This is extra information sent to the browser meant for the processing of the
request. For example, when you go to DuckDuckGo and perform a search for "RFC
3986" by typing it into the search box, the URL that your browser is directed to
reads "https://duckduckgo.com/?q=RFC+3986".

The question mark and everything that comes after it (up to the _fragment_) is
considered the "query" of the URL. Because it's part of the URL, it means that
different values of the query part of the URL points to different resources even
if the exact same content is returned.

With respect to URLs used for the World Wide Web, queries generated by browsers
(and possibly by your code) will have the following format:

* Entries in the query are "URL encoded" key-value pairs with an equal sign
  between them
* Entries are concatenated with the ampersand symbol

When the key or value of an entry in a query contains a character that is not
one of the reserved or unreserved characters, then it gets "URL encoded". That
process replaces each character a percent sign and its hexadecimal [ASCII Code].

For example, when your provide the value "Mary$quite/contrary" for your query
in DuckDuckGo, the browser "URL encodes" the "$" and "/" because those
aren't allowable characters. Those characters' ASCII Code values are 24 and 2F,
respectively. That transforms the string to "Mary%24quite%2Fcontrary".

Luckily, JavaScript has built-in methods called `encodeURI` ([link][link to
encodeURI]) and `decodeURI` ([link][link to decodeURI]) that handles that transformation for you!

### The fragment

The fragment is never sent to the server. Instead, it tells the browser to
access a specific section of the page after it loads. For example, if you look
at the following link

https://en.wikipedia.org/wiki/URL#Protocol-relative_URLs

you can see that there is a fragment value of "#Protocol-relative_URLs". If you
click on that link, the browser will load that page and, then, scroll that
section into view for you.

Unlike with changing values in _any_ of the other sections, if you change the
value in the fragment, the browser will _not_ reload the page.

## Reading RFCs

Unfortunately, RFCs tend to be very unappealing and technical, not fun to read
at all. However, you should try reading them when you have a question about how
something works that's governed by the IETF. You will gain insight that only
comes from technical documentation.

As a side note, it is a common thing for programmers to publish April Fool's
RFCs. Their sense of humor is ... shockingly technical and dry. Here are some
interesting ones, for example.

* [Hypertext Jeopardy Protocol (HTJP/1.0)]
* [Design Considerations for Faster-Than-Light (FTL) Communication]
* [TCP Option to Denote Packet Mood]

Yep, that's the kind of humor in deeply computer science-y groups.

¯\\(◉◡◔)/¯

## What you've learned

You learned that the five parts of a URL are

1. The scheme (required),
2. The authority (required),
3. The path (optional),
4. The query (optional), and
5. The fragment (optional, not sent to the server).

You were reminded that you actually know three schemes: http, https, and file.

And, that's it for URLs. :-)


[RFC 3986]: https://tools.ietf.org/html/rfc3986
[RFC 5321]: https://tools.ietf.org/html/rfc5321
[Hypertext Jeopardy Protocol (HTJP/1.0)]: https://tools.ietf.org/html/rfc8565
[Design Considerations for Faster-Than-Light (FTL) Communication]: https://tools.ietf.org/html/rfc6921
[TCP Option to Denote Packet Mood]: https://tools.ietf.org/html/rfc5841
[ASCII Code]: https://en.wikipedia.org/wiki/ASCII#Character_set
[link to encodeURI]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
[link to decodeURI]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI
