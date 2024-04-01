import Cookies from "js-cookie";
import { toast } from "react-toastify";

type Options = {
  url: string;
  method?: string;
  body?: any;
  headers?: Object;
  token?: string;
  success: Function;
  notify?: boolean;
};

const useApiFetch = async (options: Options) => {
  const headers: any = {};
  if (options.notify === undefined) {
    options.notify = true;
  }

  // ============= Cookie Start here =============
  const token = Cookies.get("XSRF-TOKEN");
  const auth_token = Cookies.get("token");

  if (token) {
    headers["X-XSRF-TOKEN"] = token;
  }

  if (auth_token) {
    headers["Authorization"] = auth_token;
  }

  headers["Accept"] = "application/json";

  const formData = new FormData();
  if (options.body) {
    for (const key in options.body) {
      formData.append(key, options.body[key]);
    }
  }

  await fetch(`http://localhost:8000/api${options.url}`, {
    method: options.method || "GET",
    headers: {
      ...headers,
      ...options.headers,
    },
    body: options.method === "GET" ? undefined : formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.status === "success") {
        if (options.success) {
          options.success(data);
        }
        return;
      }
      if (options.notify) {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (options.notify) {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
};

export default useApiFetch;
