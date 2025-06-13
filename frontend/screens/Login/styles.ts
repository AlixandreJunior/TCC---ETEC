import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: 60,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
    backgroundColor: "white",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#9C5DE4",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  button: {
    backgroundColor: "#9C5DE4",
    borderRadius: 100,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#4B5563",
    fontFamily: "Poppins-Regular",
  },
  signupLink: {
    fontSize: 16,
    color: "#9C5DE4",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  footerContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  demoButton: {
    marginTop: 15,
    padding: 10,
    alignItems: "center",
  },
  demoButtonText: {
    fontSize: 14,
    color: "#9C5DE4",
    fontFamily: "Poppins-Medium",
  },
})

