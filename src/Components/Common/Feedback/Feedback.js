import { useState, useContext } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@material-ui/core/Typography";
import useToast from "../../../Store/ToastHook";
import AppContext from "../../../Store/AppContext";
import RestService from "../../../Services/api.service";

const labels = {

  1: " not what I expected at all",

  2: "Poor, pretty disappointed",

  3: "Average",

  4: "Good, what I expected",

  5: "Excellent, above expectations!"
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const Feedback = ({ sectionsid, trainingsid }) => {
  const [value, setValue] = useState(3);
  const [value1, setValue1] = useState(3);
  const [value2, setValue2] = useState(3);
  const [hover, setHover] = useState(-1);
  const [hover1, setHover1] = useState(-1);
  const [hover2, setHover2] = useState(-1);
  const [comments, setComments] = useState('');
  const Toast = useToast();
  const { spinner } = useContext(AppContext)
  // create feedback
  const storeFeedback = () => {
    try {
      spinner.show()
      let form =
      {
        "contentDeliveryRating": value2,
        "contentRating": value1,
        "instructorRating": value,
        "reviewComments": comments
      }
      let payload = form
      RestService.storeFeedback(trainingsid, payload).then(res => {
        Toast.success({ message: `Feedback submitted successfully` });
        spinner.hide();
        setValue(0);
        setValue1(0);
        setValue2(0);
        setComments('');

      }, err => {
        spinner.hide()
      }
      );
    }
    catch (err) {
      spinner.hide()
      Toast.error({ message: `Something wrong!!` });
    }
  }

  return (
    <div>
      <form
        style={{
          border: "1px dotted black",
          borderTopLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          padding: "20px 20px 20px "
        }}
        onSubmit={storeFeedback}
      >
        <h4 style={{
          fontFamily: "udemy sans,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol",
          fontweight: "700",

          fontSsize: "20px"
        }}>How would you rate this course?</h4>
        <Box
          sx={{
            width: 550,
            display: "flex",

            alignItems: "center",
            marginTop: "20px"
          }}
        >
          <Typography >Instructor :</Typography>

          <Rating

            name="hover-feedback"
            value={value}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>

        <Box
          sx={{
            width: 550,
            display: "flex",
            alignItems: "center",
            marginTop: "20px"
          }}
        >
          <Typography >Content :</Typography>

          <Rating

            name="hover-feedback1"
            value={value1}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue1(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover1(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value1 !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover1 !== -1 ? hover1 : value1]}</Box>
          )}
        </Box>

        <Box
          sx={{
            width: 550,
            display: "flex",
            alignItems: "center",
            marginTop: "20px"
          }}
        >
          <Typography >Content Delivery:</Typography>

          <Rating

            name="hover-feedback2"
            value={value2}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue2(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover2(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value2 !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover2 !== -1 ? hover2 : value2]}</Box>
          )}
        </Box>


        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <textarea
              rows="5"
              cols="50"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
              style={{
                marginTop: "30px",

                outline: "none",
                padding: "15px",
                fontWeight: "400",
                lineHeight: "1.4",
                fontSize: "15px",
                borderRadius: "5px"
              }}
            />
          </div>
          <div>
            <button style={{
              backgroundColor: "#008CBA",
              border: "none",
              borderRadius: "10px",
              color: "white",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px"
            }} type="submit">Submit</button>
          </div>
        </div>

      </form>
    </div>

  );
}
export default Feedback