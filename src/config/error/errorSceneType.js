export default {
    SERVERERROR500: {
        type: 'SERVERERROR500',
        title: 'Erro Inesperado',
        text: 'O serviço está inativo no momento. Pedimos desculpas pelo transtorno.',
        showCloseButton: false,
        isModalScreen: false
    },
    SERVERERROR: {
        type: 'SERVERERROR',
        title: 'Ocorreu um erro',
        text: 'Houve um problema e não foi possível continuar essa operação. Entre em contato com nossa central de atendimento para entender mais.',
        buttonText: 'Quero ajuda',
        showCloseButton: true,
        isModalScreen: true
    },
    BLOCKEDACCOUNT: {
        type: 'BLOCKEDACCOUNT',
        title: 'Conta bloqueada',
        text: 'Sua conta foi bloqueada para sua segurança. Entre em contato com nossa central de atendimento para resolvermos esse problema.',
        buttonText: 'Quero ajuda',
        showCloseButton: true,
        isModalScreen: false
    },
    BLOCKEDACCOUNTKYC: {
        type: 'BLOCKEDACCOUNTKYC',
        title: 'Conta bloqueada',
        text: 'Você errou seus dados pessoais 3 vezes e por isso, sua conta foi bloqueada temporariamente para sua segurança. Entre em contato com nossa central de atendimento para resolvermos esse problema.',
        buttonText: 'Quero ajuda',
        showCloseButton: true,
        isModalScreen: false
    },
    PAYREGISTRATIONERROR: {
        type: 'PAYREGISTRATIONERROR',
        title: 'Cadastro não realizado',
        text: 'Infelizmente seu cadastro não pôde ser finalizado porque existem divergências nas suas informações.',
        buttonText: 'Quero ajuda',
        showCloseButton: true,
        isModalScreen: true
    },
    UNLOCKCARDERROR: {
        type: 'UNLOCKCARDERROR',
        title: 'Cartão cancelado',
        text: 'Você digitou incorretamente os últimos dígitos do seu cartão, por isso, ele foi cancelado para sua segurança. Entre em contato com nossa central de atendimento para resolvermos esse problema.',
        buttonText: 'Quero ajuda',
        showCloseButton: true,
        isModalScreen: true
    },
    UNLOCKCARDERROR: {
        type: 'UNLOCKCARDERROR',
        title: 'Cartão cancelado',
        text: 'Você digitou incorretamente os últimos dígitos do seu cartão, por isso, ele foi cancelado para sua segurança. Entre em contato com nossa central de atendimento para resolvermos esse problema.',
        buttonText: 'Quero ajuda',
        showCloseButton: true,
        isModalScreen: true
    },
    SUCURITYCODEERROR: {
        type: 'SUCURITYCODEERROR',
        title: 'Tente novamente',
        text: 'Você errou o código de segurança 3 vezes. Reinicie o processo ou tente novamente mais tarde.',
        showCloseButton: true,
        isModalScreen: true
    },
    RESENDSUCURITYCODEERROR: {
        type: 'RESENDSUCURITYCODEERROR',
        title: 'Tente novamente',
        text: 'Você reenviou o código de segurança 10 vezes. Reinicie o processo ou tente novamente mais tarde.',
        showCloseButton: true,
        isModalScreen: true
    },
    CURRENTPASSWORDERROR: {
        type: 'CURRENTPASSWORDERROR',
        title: 'Senha incorreta',
        text: 'Você errou sua senha antiga. Tente novamente ou entre em contato com nossa central de segurança.',
        buttonText: 'Quero Ajuda',
        showCloseButton: true,
        isModalScreen: true
    }
}