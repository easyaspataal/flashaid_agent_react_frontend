import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../style/Form.css";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
import logo from "../images/flashaid_logo.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop, { backdropClasses } from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Form = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (state === "Platinum") {
      setFlag(true);
    } else {
      setFlag(false);
    }
  });
  const [open, setOpen] = React.useState(false);

  const [leadData, setLeadData] = React.useState([]);

  const [flag, setFlag] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageAgent, setErrorMessageAgent] = useState("");
  const [agent_id, setAgentId] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [member1, setMember1] = useState("");
  const [member1age, setMember1Age] = useState("");
  const [member1rel, setMember1Rel] = useState("");
  const [member2, setMember2] = useState("");
  const [member2age, setMember2Age] = useState("");
  const [member2rel, setMember2Rel] = useState("");
  const [member3, setMember3] = useState("");
  const [member3age, setMember3Age] = useState("");
  const [member3rel, setMember3Rel] = useState("");

  const handleMobileNumberChange = (event) => {
    const { value } = event.target;
    const validMobileNumber = /^\d{10}$/g.test(value);
    setMobileNumber(value);
    if (!validMobileNumber) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
    } else {
      setErrorMessage("");
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Mobile number:", mobileNumber);
  // };
  const _memberData = [
    {
      name,
      age,
      realationWithCustomer: "self",
    },
    {
      member1,
      member1age,
      member1rel,
    },
  ];

  const _memberDataPlatinum = [
    {
      name,
      age,
      realationWithCustomer: "self",
    },
    {
      member1,
      member1age,
      member1rel,
    },
    {
      member2,
      member2age,
      member2rel,
    },
    {
      member3,
      member3age,
      member3rel,
    },
  ];

  const AgentLead = async (event) => {
    try {
      event.preventDefault();
      console.log("inside agentLead",agent_id,address,email,mobileNumber,state)
      setOpen(true);
      const _data = {
        agent_id: agent_id,
        address,
        email,
        contact: mobileNumber,
        plan_id:
          state === "Silver"
            ? "FSP0001"
            : state === "Gold"
            ? "FSP0002"
            : "FSP0003",
        customerData: flag ? _memberDataPlatinum : _memberData,
        remainingUrgentVisits:
          state === "Silver" ? "0" : state === "Gold" ? "4" : "6",
        remainingVisits:
          state === "Silver" ? "4" : state === "Gold" ? "4" : "6",
      };
      const orderData = await axios
        .post("/flashaid/agentlead", _data)
        .then((res) => {
          setOpen(false);
          if (res.data.code == 200) {
            setLeadData(res.data.leadData);
            toast.success("Code Applied successfully !", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setCouponApplied(true);
            setCouponError(false);
            setErrorMessageAgent("");
          } else {
            setCouponApplied(false);
            setCouponError(true);
            setErrorMessageAgent("Given Agent Code  Or Promo Code is Invalid");
            toast.error("Invalid Code !", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePayment = async (data) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      // key: "rzp_test_hVjBOn6X9uauSZ",
      key: "rzp_test_hVjBOn6X9uauSZ",

      currency: data.currency,
      amount: Number(data.amount) * 100,
      order_id: data.id,
      name: "Flashaid",
      image: logo,
      id: data.id,

      handler: async function (response) {
        if (
          typeof response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1
        ) {
          alert("Something is wrong !!");
        } else {
          navigate("/");

          const _paymentData = {
            agent_id: leadData.agentId,
            customer_id: leadData.customerId,
            subscription_id: leadData.subscriptionId,
            payment_details: {
              id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
            },
          };

          const updatePaymentStatus = await axios
            .post("/flashaid/paymentstatus", _paymentData)
            .then((res) => {
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    };

    const _window = window;
    const paymentObject = new _window.Razorpay(options);
    paymentObject.open();
  };

  const clickHandler = async () => {
    const _data = {
      amount:
        state === "Silver" ? "12744" : state === "Gold" ? "19115" : "31859",
      name: name,
      contact: mobileNumber,
      email: email,
      agent_id: leadData.agentId,
      subscription_id: leadData.subscriptionId,
      customer_id: leadData.customerId,
      plan:
        state === "Silver"
          ? "FSP0001"
          : state === "Gold"
          ? "FSP0002"
          : "FSP0003",
    };
    const orderData = await axios
      .post("/flashaid/paymentorder", _data)
      .then((res) => {
        handlePayment(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form  onSubmit={AgentLead}>
        <div className="textContainer">
          <TextField
            className="textfield"
            required
            id="outlined-required"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="textfield"
            label="Mobile number"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            InputProps={{
              inputProps: {
                pattern: "\\d{10}",
                title: "Please enter a valid 10-digit mobile number",
              },
            }}
            error={!!errorMessage}
            helperText={errorMessage}
            required
          />
        </div>
        <div className="textContainer">
          <TextField
            className="textfield"
            required
            id="outlined-required"
            placeholder="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className="textfield"
            required
            id="outlined-required"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="textContainer">
          <TextField
            className="textfield"
            required
            id="outlined-required"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            className="textfield"
            required
            id="outlined-required"
            placeholder="Plan"
            value={state}
            disabled
          />
        </div>
        <div className="addmore">
          <p className="other">Add Other Members</p>
        </div>

        <div>
          <div className="textContainer">
            <TextField
              className="moretextfield"
              required
              id="outlined-required"
              placeholder="Name"
              value={member1}
              onChange={(e) => setMember1(e.target.value)}
            />
            <TextField
              className="moretextfield"
              required
              id="outlined-required"
              placeholder="age"
              value={member1age}
              onChange={(e) => setMember1Age(e.target.value)}
            />
            <TextField
              className="moretextfield"
              required
              id="outlined-required"
              placeholder="Relation with Subscriber"
              value={member1rel}
              onChange={(e) => setMember1Rel(e.target.value)}
            />
          </div>
        </div>
        <br />
        {flag && (
          <div>
            <div>
              <div className="textContainer">
                <TextField
                  className="moretextfield"
                  required
                  id="outlined-required"
                  placeholder="Name"
                  value={member2}
                  onChange={(e) => setMember2(e.target.value)}
                />
                <TextField
                  className="moretextfield"
                  required
                  id="outlined-required"
                  placeholder="age"
                  value={member2age}
                  onChange={(e) => setMember2Age(e.target.value)}
                />
                <TextField
                  className="moretextfield"
                  required
                  id="outlined-required"
                  placeholder="Relation with Subscriber"
                  value={member2rel}
                  onChange={(e) => setMember2Rel(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div>
              <div className="textContainer">
                <TextField
                  className="moretextfield"
                  required
                  id="outlined-required"
                  placeholder="Name"
                  value={member3}
                  onChange={(e) => setMember3(e.target.value)}
                />
                <TextField
                  className="moretextfield"
                  required
                  id="outlined-required"
                  placeholder="age"
                  value={member3age}
                  onChange={(e) => setMember3Age(e.target.value)}
                />
                <TextField
                  className="moretextfield"
                  required
                  id="outlined-required"
                  placeholder="Relation with Subscriber"
                  value={member3rel}
                  onChange={(e) => setMember3Rel(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        <br />
        <div className="addmore">
          <TextField
            className="textfield"
            required
            id="outlined-required"
            placeholder="Add Agent Code Or Promo Code* eg.- FAA000xxx"
            value={agent_id}
            onChange={(e) => setAgentId(e.target.value)}
            error={!!errorMessageAgent}
            helperText={errorMessageAgent}
          />
          &emsp;&emsp;
          {couponApplied ? (
            <button disabled className="appliedButton">
              Applied
            </button>
          ) : (
            <button
              className="addMoreButton"
              type="submit"
              
            >
              Apply
            </button>
          )}
          <ToastContainer />
        </div>
      </form>
      <br />
      <h2 className="addmore">Billing Details</h2> 
      <div className="billConatainer">
        <div className="amountRow">
          <p className="otherBilling">Subtotal :</p>  
          {state==="Silver"?<p className="otherBilling"> ₹11999</p>:state === "Gold"?<p className="otherBilling"> ₹17999</p>:<p className="otherBilling"> ₹29999</p>}
        </div>
      </div>
      {couponApplied && <div>

      <div className="billConatainer">
        <div className="amountRow">
          <p className="otherDiscount">Discount 10% :</p>
          {state==="Silver"?<p className="otherDiscount">- ₹1200</p>:state === "Gold"?<p className="otherDiscount">- ₹1800</p>:<p className="otherDiscount">- ₹3000</p>}
        </div>
      </div>
      <div className="billConatainer">
        <div className="amountRow">
          <p>GST 18% :</p>
          {state==="Silver"?<p className="otherDiscount">₹1945</p>:state === "Gold"?<p className="otherDiscount">₹2916</p>:<p className="otherDiscount">₹4860</p>}
        </div>
      </div>
      <div className="billConatainer">
        <div className="amountRow">
          <p className="otherBilling">Grand Total :</p>
          {state==="Silver"?<p className="otherDiscount">₹12744</p>:state === "Gold"?<p className="otherDiscount">₹19115</p>:<p className="otherDiscount">₹31859</p>}
        </div>
      </div>
      </div>}
      <br />
      <div className="addmore">
        <button
          disabled={!couponApplied}
          className={couponApplied ? "paymentButton" : "inactivePaymentButton"}
          onClick={() => clickHandler()}
        >
          <span>Checkout</span> <ArrowForwardIcon />
        </button>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Form;
