---
Area: containers
ContentId: B1DF33C0-400C-413D-B60B-D1AA278F6DE3
PageTitle: Debug a .NET Core app running in a Docker container
DateApproved: 01/29/2020
MetaDescription: Debug a .NET Core app running in a Docker container, using Visual Studio Code.
---
# Debug .NET Core within a container

## Prerequisites

1. Install the [.NET Core SDK](https://www.microsoft.com/net/download), which includes support for attaching to the .NET Core debugger.

1. Install the Visual Studio Code [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp), which includes support for attaching to the .NET Core debugger with VS Code.

1. macOS users only: Add `/usr/local/share/dotnet/sdk/NuGetFallbackFolder` as a shared folder in your Docker preferences.

    ![dockerSharedFolders](images/debug/mac-folders.png)

## Walkthrough

1. If needed, create a .NET Core project with `dotnet new`.
1. Open the project folder in VS Code.
1. Wait until a notification appears asking if you want to add required assets for debugging. Click **Yes**:

   ![csharpPrompt](images/debug/csharp-prompt.png)

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and enter **Docker: Add Docker Files to Workspace...**. If you have already dockerized your app, you can instead do **Docker: Initialize for Docker debugging**. Follow the prompts.
1. Switch to the Run view (`kb(workbench.view.debug)`).
1. Select the **Docker .NET Core Launch** launch configuration.
1. Optionally, set a breakpoint.
1. Start debugging! (`kb(workbench.action.debug.start)`)

For additional customization options, see the documentation on [Tasks](/docs/containers/reference.md) and [Debug containerized apps](/docs/containers/debug-common.md).
