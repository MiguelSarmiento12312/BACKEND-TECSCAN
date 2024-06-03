const loginController = {
    login: async (req, res) => {
      return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    }
  };
  
  export default loginController;
  