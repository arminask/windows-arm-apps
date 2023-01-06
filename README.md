# windows-arm-apps

A Website, listing Windows ARM apps that can run natively on ARM architecture.


[https://armrepo.ver.lt](https://armrepo.ver.lt/)


To add a new app to a website, edit this file:
```
assets/config.yml
```

Add a new category:
```
  - name: "Web Browsers" # Category name
    icon: "fa-solid fa-file-zipper" # Category icon from https://fontawesome.com/icons
    items:
```

Add a new app (below the category section, below "items:" line):
```
      - name: "Firefox Browser" # App name
        logo: "assets/tools/firefox.png" # App icon
        url: "https://www.mozilla.org/en-GB/firefox/all/#product-desktop-release" # URL to download the app
        target: "_blank"
```


App icons:
```
assets/tools/*.png
```

App icons have to be in png format, transparent and 64x64 in size.

##
Website template from [Homer](https://github.com/bastienwirtz/homer).
