import { useState } from "react";
import "../styles/from.css";
import Image1 from "./myimage/Image1.png";
import image2 from "./myimage/image2.png";
import image3 from "./myimage/image3.png";

function LoginEmp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "user@example.com" && password === "password123") {
      alert("เข้าสู่ระบบสำเร็จ");
      setError("");
    } else {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="login-container">
      <table>
        <tr>
          <img src={Image1} height={90} width={200} alt="รูปภาพเข้าสู่ระบบ" />
        </tr>
        <tr>
          <img src={image2} height={10} alt="รูปภาพเข้าสู่ระบบ" />
        </tr>
        <tr>
          <img src={image3} height={10} alt="รูปภาพเข้าสู่ระบบ" />
        </tr>
      </table>

      <h2>เข้าสู่ระบบ</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>อีเมล:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>รหัสผ่าน:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}

export default LoginEmp;
