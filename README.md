# Windows ARM apps

This is a project listing Windows ARM software that can run natively on ARM architecture.


[https://armrepo.ver.lt](https://armrepo.ver.lt/)

<br>

## How to add a new application to the list

**First clone this repository**

```
git clone https://github.com/arminask/windows-arm-apps
```

<br>

**To add a new app to the website, edit this file**

```
assets/config.yml
```

<br>

**If you need to add a new category for your application**

```
  - name: "Web Browsers" # Category name
    icon: "fa-solid fa-file-zipper" # Category icon from https://fontawesome.com/icons
    items:
```

<br>

**To add a new item below the category**

```
      - name: "Firefox Browser" # App name
        logo: "assets/tools/firefox.png" # App icon
        subtitle: "ARM64/ARM64EC/ARM32, unofficial builds. Free and open-source web browser developed by the Mozilla"
        url: "https://www.mozilla.org/en-GB/firefox/all/#product-desktop-release" # URL to download the app
        target: "_blank" # Opens the URL in a new tab
```

<br>

> In the subtitle key value, you should define which architecture/code the application was built with.
> 
> For example, it could be ARM64/ARM64EC/ARM32.
> 
> If the software doesn't have an official build, you can add a value: unofficial builds
> 
> You can add more information about the application to the "subtitle" key if you think it's necessary.

<br>

**Include the application picture**

> After you have added a new item in `assets/config.yml` file, you need to add a picture for the app.

> Make sure you correctly defined the icon name and it's path in the `logo` key and value.

> App icons must be in `PNG` format, `transparent` and 64x64 in width and height.

```
assets/tools/firefox.png
```

<br>

**Serve the website locally**

> This must be done to verify that the changes you have made to the website are correct and do not have any errors.
> 
> There are different ways you can serve an html website.
>
> You can use `apache2`, `nginx`, `Python Flask` or other servers for this, use the option that's best for you.
> 
> You can easily serve local content with Python and this script in the project root directory.

```
import http.server
import socketserver
import os

# Define the port on which you want to serve your site
PORT = 8000

# Define the directory you want to serve
WEB_DIR = "."  # Will serve in the current directory

# Change the current working directory to the web directory
os.chdir(WEB_DIR)

# Handler for the server
Handler = http.server.SimpleHTTPRequestHandler

# Create the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
```

You can run the script with this command

```
python webserve.py
```

Now enter `http://localhost:8000` URL in your web browser and verify that everything is working.

<br>

**Push your changes to GitHub**

Once you have made your changes and verified that they do not have any errors or grammatical errors, make a pull request.

Thank you!

## Credits

- Thanks to all of the contributors for managing this project
- This project uses [Homer](https://github.com/bastienwirtz/homer) static page as it's base
