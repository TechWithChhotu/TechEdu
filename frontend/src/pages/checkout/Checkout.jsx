import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
//userid,courseid
import { selectUserData } from "../../stores/user.slice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import api from "../../services/api.v1.js";

const logo =
  "https://res.cloudinary.com/dsdkzs1qq/image/upload/v1766880854/facvicon_techedu_lyyuij.png";

function Checkout() {
  const { id } = useParams(); // courseId
  const [amount, setAmount] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await api.get(`/course/${id}`);
      setCourse(res.data.course);

      // 💰 calculate final price
      const price = res.data.course.price;
      const discount = res.data.course.discount || 0;
      const discountedPrice = Math.round(price - (price * discount) / 100);

      setAmount(Math.round(discountedPrice));
    };

    fetchCourse();
  }, [id]);
  console.log("amount => ", amount);

  const courseId = id;

  const handleOpenRazorpay = async (data) => {
    const Razorpaykey = import.meta.env.VITE_RAZORPAY_KEY; // Enter the Key ID generated from the Dashboard

    var options = {
      amount: data?.data?.amount,
      key: Razorpaykey, // unt is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "TechEdu",
      description: "TechEdu",
      image: logo,
      order_id: data?.data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        await axios
          .post(
            "http://localhost:3000/api/v1/payment/verify",
            { ...response, courseId },
            { withCredentials: true }
          )
          .then((res) => {})
          .catch((e) => {
            console.log(e);
          });
      },

      notes: {
        address: "TechEdu",
      },
      theme: {
        color: "#1aa3ff",
      },
    };

    const razorpayInstance = new window.Razorpay(options);

    razorpayInstance.open();
  };

  const handlePayment = async (amountX) => {
    const res = await api.post("http://localhost:3000/api/v1/payment/order", {
      amount: amountX,
      courseId,
    });

    if (res.status === 200) {
      handleOpenRazorpay(res.data);
    }
  };
  return (
    <div>
      <button
        onClick={() => handlePayment(amount * 100)}
        className=" bg-green-600 block m-auto my-20 py-2 px-10 rounded text-white font-semibold text-xl"
      >
        Pay now
      </button>
    </div>
  );
}

Checkout.propTypes = {
  amount: PropTypes.number.isRequired,
};
export default Checkout;
