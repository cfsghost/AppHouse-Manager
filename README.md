AppHouse Manager
---
Management of [AppHouse](http://github.com/cfsghost/AppHouse/), to manage applications on hosting platform

Installation
-
AppHouse-Manager is running as an application on AppHouse hosting platform, it manages applications through Manager API of AppHouse.

1. Install to apps directory:

        cd <AppHouse>/apps
        git clone https://cfsghost@github.com/cfsghost/AppHouse-Manager.git

2. Allow AppHouse-Manager to use Manager API:

    Modifiy config file of AppHouse:

        <AppHouse>/config/default.yaml

    Add "AppHouse-Manager" to config file:

        admin:
          tools:
            - 'AppHouse-Manager'

3. Restart AppHouse to apply config
4. You can use browser to login now. (Default account: admin/admin)


How to Manage Accounts:
-
Manage accounts of AppHouse-Manager with modifying `<AppHouse-Manager>/config/default.yaml`. it can be set couple of account.

License
-
Licensed under the GPL-2.0
Authors
-
Copyright(c) 2012 Fred Chien <<fred@mandice.com>>

Copyright
-
Copyright(c) 2012 Mandice Company. (http://www.mandice.com/)