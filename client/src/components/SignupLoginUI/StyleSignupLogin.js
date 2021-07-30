import { makeStyles } from "@material-ui/core/styles";
import bgImg from "../../assets/bg_friends_img.png";

export const useStyles = makeStyles((theme) => ({
  mainGrid: {
    height: "100vh",
  },
  imgPanel: {
    background: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
    minHeight: "100vh",
  },
  imgPanelColorOverlay: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    background: `linear-gradient(
       #3A8DFF,
      #86B9FF
    )`,
    opacity: 0.85,
  },
  imgPanelTextOverlay: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    overflow: "hidden",
  },
  imgHeader: {
    width: "15ch",
    paddingBottom: "30px",
    marginTop: "50px",
    textAlign: "center",
    lineHeight: 1.6,
    color: "white",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      paddingBottom: "10px",
      marginTop: "10px",
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: "150px",
      marginTop: "50px",
    },
  },
  formPanel: {
    minHeight: "100vh",
  },
  xlButtonWhite: {
    height: "70px",
    width: "185px",
    boxShadow: "0px 0px 15px 0px rgb(88 83 150 / 20%);",
    marginRight: theme.spacing(2),
    backgroundColor: "white",
  },
  xxlButton: {
    height: "75px",
    width: "210px",
    boxShadow: "0px 0px 15px 0px rgb(88 83 150 / 20%);",
    marginRight: theme.spacing(2),
  },
  pageChangeText: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(5),
    },
  },
  formWrapper: {
    width: "85%",
    marginTop: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      width: "75%",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(10),
      width: "70%",
    },
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    fontSize: "28px",
  },
  inputFont: {
    fontSize: 18,
  },
  labelFont: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.palette.secondary,
  },
}));
