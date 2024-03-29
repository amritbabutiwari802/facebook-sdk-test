import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css'; 
import { Dropdown, Menu } from "antd";


const App = (props) => {
  const [permissionNotGranted, setPermissionStatus] = useState(false)
  const [pageNotGranted, setPageStatus] = useState(false);
  const [data, setdata] = useState({ ready: false, data: [] })
  const [selectedPage,setPage] = useState({name:"",id:"",selected:false})

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

  function handleFBLogin() {
    var breakOperation = false;
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ", response);
          window.FB.api(
            `/${response.authResponse.userID}/permissions`,
            "GET",
            function (permissionResponse) {
              console.log("granted permission", permissionResponse);
              for (let i = 0; i < permissionResponse.data.length; i++) {
                if (permissionResponse.data[i].status !== "granted") {
                  breakOperation = true;
                  setPermissionStatus(true);
                  break;
                }
              }
              if (breakOperation) {
                return;
              }
              window.FB.api(
                `/${response.authResponse.userID}/accounts?fields=name&access_token=${response.authResponse.accessToken}`,
                "GET",
                async function (assigendPages) {
                  console.log(assigendPages, "assigned pages");
                  if (assigendPages.data.length === 0) {
                    breakOperation = true;
                    setPageStatus(true);
                  }

                  if (breakOperation) {
                    return;
                  }

                  setdata({ ready: true, data: assigendPages.data });
                }
              );
            }
          );
        } else {
          console.log(
            "User cancelled login or did not fully authorize.",
            response
          );
        }
      },
      {
        scope: "instagram_basic instagram_manage_messages",
      }
    );
  }

  return (
    <div>
      {!data.ready && (
        <div>
          {permissionNotGranted && (
            <p>
              you didn't frtant all permissions. Permissions are requier to
              proceed. Click below to regrant permissions
            </p>
          )}
          {pageNotGranted && (
            <p>
              you didn't frtant any page permissions. Page Permissions are
              requier to proceed. Click below to regrant permissions
            </p>
          )}
          <div
            onClick={handleFBLogin}
          >
          To Integrate Facebook , Login to facebook by clicking below
          </div>
        </div>
      )}
      {data.ready && (<div>
        <Dropdown overlay={< Menus data={data.data} onClick={(id) => {
          data.data.forEach((value) => {
            if (value.id === id) {
               setPage({ id, name:value.name, selected: true });
            }
          })
         
        }} />}>
          <a onClick={(e) => e.preventDefault()}>
           chose a fb page
          </a>
        </Dropdown>
        {selectedPage.selected && <div>
        You selected {selectedPage.name}
        </div>}  
      </div>
      )}
    </div>
  );
};

export default App;


const Menus = (props) =>{
  return  <Menu onClick={(e)=>{props.onClick(e.key)}}
    items={props.data.map((value)=>( {
        key: value.id,
        label: (
          <a target="_blank" rel="noopener noreferrer" >
           {value.name}
          </a>
      ),
       
      }))}
  />
}









/*
[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
   
    ]
 */






/*     const backendResponse = await fetch(
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
                      } */