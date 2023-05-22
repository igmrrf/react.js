export const useAddStyles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: (theme: any) => theme.palette.background.paper,
    borderRadius: "20px",
    boxShadow: (theme: any) => theme.shadows[5],
    padding: (theme: any) => theme.spacing(2, 4, 3),
    height: "auto",
  },
  add: {
    height: "50px",
    margin: "20px",
    marginBottom: "40px",
    zIndex: "1000",
  },
  button: {
    marginTop: "20px",
  },
};

export const useContainerStyles = {
  root: {
    textAlign: "center",
    paddingRight: "40px",
    paddingLeft: "40px",
  },
  image: {
    height: "20vmin",
    pointerEvents: "none",
  },
  card: {
    padding: "20px",
    position: "relative",
  },
  delete: {
    position: "absolute",
    top: "10px",
    left: "10px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    paddingBottom: "20px",
    paddingTop: "20px",
  },
  button: {
    marginTop: "20px",
  },
  length: {
    fontSize: "16px",
    color: "#1565c0",
  },
  edit_Delete: {
    display: "flex",
    justifyContent: "space-around",
  },
};

export const useEditStyles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: (t: any) => t.palette.background.paper,
    borderRadius: "20px",
    boxShadow: (t: any) => t.shadows[5],
    padding: (t: any) => t.spacing(2, 4, 3),
    height: "150px",
  },
  button: {
    marginTop: (t: any) => t.spacing(2),
  },
  edit: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
};
