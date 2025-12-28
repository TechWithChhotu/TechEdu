// import User from "../models/user.model.js";
import { User } from "../models/user.models.js";
import Course from "../models/courses.models.js";
import Order from "../models/order.models.js";
import Razorpay from "razorpay";
import crypto, { Hmac } from "crypto";

const RAZORPAY_SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;
const RAZORPAY_ID_KEY = process.env.RAZORPAY_ID_KEY;

function generateSignature(orderId, paymentId, secretKey) {
  const hmac = crypto.createHmac("sha256", secretKey);
  const data = `${orderId}|${paymentId}`;
  hmac.update(data);

  const generatedSignature = hmac.digest("hex");
  return generatedSignature;
}

const order = (req, res) => {
  let instance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY,
  });
  const { amount } = req.body;

  var options = {
    amount: amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.send({ code: 500, message: err });
    }

    return res.send({ code: 200, message: "order created", data: order });
  });
};

/*----------------->>Varify payment<<-----------------*/
const verify = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    courseId,
  } = req.body;

  const generated_signature = generateSignature(
    razorpay_order_id,
    razorpay_payment_id,
    RAZORPAY_SECRET_KEY
  );

  if (generated_signature == razorpay_signature) {
    const userid = req.user.id;
    courseId;
    const order = await Order.create({
      user: userid,
      course: courseId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "paid",
    });

    // 4️⃣ Add course to user
    await User.findByIdAndUpdate(userid, {
      $addToSet: { enrolledCourses: courseId },
    });

    // 5️⃣ Add user to course
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: {
        enrolledStudents: {
          user: userid,
          order: order._id,
        },
      },
      $inc: { enrolledStudentsCount: 1 },
    });

    res.status(201).json({
      success: true,

      message: "Payment successful & course assigned",
      amount: 500,
    });
  }
};

const ping = (req, res) => {
  res.send("PONG");
};

export { order, verify, ping };
