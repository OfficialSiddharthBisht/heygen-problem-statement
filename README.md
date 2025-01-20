# Heygen Video Translation - Coding Exercise

## Problem Overview

Heygen is an AI-powered video creation platform that allows users to translate videos from one language to another while keeping the lip movements synchronized with the new audio (this is known as **lip sync**). The video translation process is time-consuming and depends on several factors like the video length and complexity.

### Server Part (The Chef in the Kitchen)

The server will simulate the backend of the video translation service. It provides an endpoint `/status` that returns the current status of the translation process. The possible statuses are:

- **pending**: The translation is still in progress.
- **completed**: The translation is finished and ready.
- **error**: Something went wrong during the translation.

To simulate the translation process, the server will wait for a configurable amount of time before transitioning the status to **completed** or **error**.

### Client Library (The Tool for Other Developers)

Your task is to build a **client library** that can efficiently check the status of the translation job by calling the server’s `/status` endpoint.

In the trivial approach, the client would just make an HTTP request to check the status repeatedly. However, there are issues with this approach:

- **Too Frequent Requests**: Calling the endpoint every second can be wasteful and create unnecessary load.
- **Too Infrequent Requests**: Calling the endpoint too slowly may result in unnecessary delays, where the status could have been fetched earlier.

### What You Need to Build

You are tasked with building a **smart client library** that checks the translation status more efficiently. Here are some features and considerations you should implement in your client library:

1. **Gradual Polling Intervals**: Start by checking frequently and gradually reduce the polling frequency over time.
2. **Automatic Retries**: Handle network issues or server errors by automatically retrying the request.
3. **Timeouts**: Set a maximum timeout for how long the client should wait for the translation status.
4. **Configurable Intervals**: Allow users to customize the polling intervals and maximum retries.
5. **Error Handling and Logging**: Ensure that errors are logged and managed gracefully, providing the user with clear feedback.

### Example Use Case

Imagine you have a video in **English** that you want to translate to **Spanish**, keeping the lip sync in the new language. This is a common feature offered by Heygen.

In real life, this translation takes time. You can think of it like **cooking a complex meal** that requires patience and attention to detail.

### Deliverables

1. **Server Implementation**:
   - Implement the `/status` endpoint that simulates the translation process.
   - Return the status as `pending`, `completed`, or `error`.

2. **Client Library**:
   - Build a smart client library that interacts with the server's `/status` endpoint.
   - Ensure efficient polling, retries, and proper error handling.

3. **Integration Test**:
   - Write a small integration test that:
     - Spins up your server.
     - Uses the client library to demonstrate usage.
     - Prints the logs of the status.

4. **Documentation**:
   - Provide a small documentation on how to use the client library.

### Key Considerations

- **Polling Efficiency**: The client should not constantly hit the server too often or too slowly.
- **Network Issues**: Handle temporary network errors gracefully by retrying the request.
- **Timeout Handling**: The library should not wait forever. Set timeouts for the requests and polling.
- **Configurability**: Allow users to configure polling intervals, retries, and timeouts to suit their needs.
- **Error Handling**: Provide proper error messages and logs to users.

### Example Scenarios

- **Poll too frequently**: Imagine calling the server every second. This is wasteful and causes unnecessary load on the server.
- **Poll too infrequently**: Imagine calling the server once every hour. This could result in unnecessary delays and missing an update when the job is completed.

### Conclusion

In this exercise, your goal is to build a smart, efficient, and configurable client library that interacts with the Heygen video translation server. By improving the polling strategy and providing proper error handling and logging, you’ll deliver a library that is easy to integrate into third-party applications.

---

### Submission

- A public GitHub repository with the implementation.
- A detailed README file with setup instructions and usage examples.
- A working integration test to demonstrate the client library’s functionality.