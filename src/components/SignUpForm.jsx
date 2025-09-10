import { useState, useEffect, useRef } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    otp: ["", "", "", "", "", ""],
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const otpRefs = useRef([]);

  // Generate a random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData((prev) => ({
      ...prev,
      otp: newOtp,
    }));

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP input key events
  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handlePaste(e);
    }
  };

  // Handle paste functionality
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const otpDigits = pastedData.replace(/\D/g, "").slice(0, 6);

    if (otpDigits.length === 6) {
      const newOtp = otpDigits.split("");
      setFormData((prev) => ({
        ...prev,
        otp: newOtp,
      }));

      // Focus last input
      otpRefs.current[5]?.focus();
    }
  };

  // Simulate OTP autofill from SMS
  const simulateOtpAutofill = () => {
    const otp = generateOTP();
    setGeneratedOtp(otp);

    // Simulate delay for SMS delivery
    setTimeout(() => {
      const otpDigits = otp.split("");
      setFormData((prev) => ({
        ...prev,
        otp: otpDigits,
      }));

      setMessage("OTP auto-filled from SMS!");
      setTimeout(() => setMessage(""), 3000);
    }, 2000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      setMessage("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    const otpString = formData.otp.join("");
    if (otpString.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setMessage("Account created successfully!");
      setIsSubmitting(false);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        otp: ["", "", "", "", "", ""],
      });
      setShowOtp(false);
    }, 1500);
  };

  // Handle send OTP
  const handleSendOtp = () => {
    if (!formData.email && !formData.phone) {
      setMessage("Please enter email or phone number first");
      return;
    }

    setShowOtp(true);
    setMessage(
      "OTP sent to your registered phone number. Please check your SMS."
    );
    setTimeout(() => setMessage(""), 3000);
  };

  // WebOTP API implementation for real SMS detection
  useEffect(() => {
    if (!showOtp) return;

    // Check if WebOTP API is supported
    if (!("OTPCredential" in window)) {
      console.log("WebOTP API not supported, falling back to simulation");
      // Fallback to simulation after delay
      const timer = setTimeout(() => {
        if (formData.otp.every((digit) => digit === "")) {
          simulateOtpAutofill();
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }

    // Request OTP from SMS using WebOTP API
    const requestOTP = async () => {
      try {
        const otp = await navigator.credentials.get({
          otp: {
            transport: ["sms"],
          },
        });

        if (otp && otp.code) {
          const otpDigits = otp.code.split("").slice(0, 6);
          setFormData((prev) => ({
            ...prev,
            otp: otpDigits,
          }));

          setMessage("OTP auto-filled from SMS!");
          setTimeout(() => setMessage(""), 3000);
        }
      } catch (err) {
        console.log("WebOTP failed:", err);
        // Fallback to simulation if WebOTP fails
        setTimeout(() => {
          if (formData.otp.every((digit) => digit === "")) {
            simulateOtpAutofill();
          }
        }, 2000);
      }
    };

    // Start listening for OTP
    requestOTP();

    // Cleanup function
    return () => {
      // WebOTP doesn't need explicit cleanup
    };
  }, [showOtp]);

  return (
    <div className="container">
      <h1 className="title">Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {!showOtp ? (
          <button
            type="button"
            className="submit-btn"
            onClick={handleSendOtp}
            style={{ marginBottom: "20px" }}
          >
            Send OTP
          </button>
        ) : (
          <>
            <div className="form-group">
              <label>Enter OTP *</label>
              <div className="otp-container">
                {formData.otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    className={`otp-input ${digit ? "filled" : ""}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handlePaste}
                    maxLength="1"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="submit-btn"
              onClick={simulateOtpAutofill}
              style={{
                marginBottom: "10px",
                background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              }}
            >
              Simulate OTP (Fallback)
            </button>
          </>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting || !showOtp}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {message && (
        <div
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}

      {generatedOtp && (
        <div className="demo-otp">
          <h4>Demo OTP (Fallback Mode)</h4>
          <div className="otp-code">{generatedOtp}</div>
          <p>This OTP was auto-filled using fallback simulation</p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
