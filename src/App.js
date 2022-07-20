import React, { useEffect } from "react";



const App = (props) => {
  const [permissionNotGranted, setPermissionStatus] = useState(false)
  const [pageNotGranted, setPageStatus] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "343921607951637",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v14.0",
        status: true,
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName("script")[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement("script");
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return (
    <div>
      {permissionNotGranted && (
        <p>
          you didn't frtant all permissions. Permissions are requier to proceed.
          Click below to regrant permissions
        </p>
      )}
      {pageNotGranted && (
        <p>
          you didn't frtant all page permissions. Page Permissions are requier to proceed.
          Click below to regrant permissions
        </p>
      )}
      <div
        onClick={() => {
         var breakOperation=false
          window.FB.login(
            function (response) {
              if (response.authResponse) {
                console.log(
                  "Welcome!  Fetching your information.... ",
                  response
                );
                window.FB.api(
                  `/${response.authResponse.userID}/permissions`,
                  "GET",
                  function (permissionResponse) {
                    console.log("granted permission", permissionResponse);
                    for (let i = 0; i < permissionResponse.data.length; i++) {
                      if (permissionResponse.data[i].status != "granted") {
                        breakOperation= true
                        setPermissionStatus(true);
                        break;
                      }
                    }
                    if (breakOperation) {
                    return 
                  }
                    window.FB.api(
                      `/${response.authResponse.userID}/accounts?fields=name&access_token=${response.authResponse.accessToken}`,
                      "GET",
                      async function (assigendPages) {
                        console.log(assigendPages, "assigned pages");
                        if (assigendPages.data.length == 0)
                        {
                          breakOperation = true
                          setPageStatus(true)
                          }

 if (breakOperation) {
   return;
 }
                        const backendResponse = await fetch(
                          "https://grambellbackend.loca.lt/integration",
                          {
                            method: "post",
                            headers: {
                              // firebase auth token
                              "x-client-id":
                                "6aba4bef-456a-419b-b452-2b69dcd1c495",
                              "Content-Type": "application/json",
                              "Bypass-Tunnel-Reminder": "allow",
                            },
                            // body: JSON.stringify({ page, userId, accessToken }),
                            body: JSON.stringify({
                              provider: "FACEBOOK",
                              name: "Bibash Facebook",
                              config: {
                                pageId: assigendPages.data[0].id,
                                userId: response.authResponse.userID,
                                accessToken: response.authResponse.accessToken,
                              },
                            }),
                          }
                        );
                        const data = await backendResponse.json();
                        console.log("data from backend", data);
                      }
                    );
                  }
                );
              } else {
                console.log("User cancelled login or did not fully authorize.");
              }
            },
            {
              scope:
                "public_profile,email,pages_messaging,pages_read_engagement,pages_show_list,pages_manage_metadata",
            }
          );
        }}
      >
        FacebookIntegr
      </div>
    </div>
  );
};

export default App;
