const errors = {
    // all
    InvalidDataException: 'Um ou mais dados informados são inválidos.',

    // auth
    LoginFailException: 'E-mail e/ou senha inválidos ou não existem.'
};

export default {
    get: (error) => {
        return errors[error] ?? 'Houve um erro inesperado, entre em contato conosco.'
    }
};