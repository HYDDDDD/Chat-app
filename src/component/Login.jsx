function Login(props) {  

  return (
    <div>
      <div>
        {!props.statusSignIn ? (
          <div>
            {/* Show button sign-in */}
            <div>
              <button
                className="bg-sky-500 flex items-center p-1"
                onClick={props.signInWithGoogle}
              >
                {/* Show profile and user name (Not logged in) */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                  alt="avatar"
                  className="w-12 h-12"
                />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              {/* Show button sign-out */}
              <button
                className="bg-orange-600 flex items-center space-x-4 p-1"
                onClick={props.signOutUser}
              >
                {/* Show profile and user name */}
                <img
                  src={props.currentUser.photoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full"
                />
                <div>{props.currentUser.displayName}</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
