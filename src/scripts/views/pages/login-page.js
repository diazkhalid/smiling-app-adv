/* eslint-disable camelcase */
import Swal from 'sweetalert2';
import Session from '../../utils/session';

const LoginPage = {
  async render() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const wave = document.querySelector('#wave');
    header.classList.add('d-none');
    footer.classList.add('d-none');
    wave.classList.add('d-none');
    Session.isNotAdmin();
    return `
        <div class="container-login">
            <div class="forms-container">
                <div class="signin-signup" id="formDiv">
                    <form action="#" class="sign-in-form" id="formLogin">
                        <h2 class="title">WELCOME ADMIN</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input id="username-admin" type="text" required placeholder="Username" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input id="pass-admin" type="password" required placeholder="Password" />
                        </div>
                        <input id="submit-admin" type="submit" value="Login" class="btn-login solid" />
                        <a href="#/" class="text-primary login-back-btn">Kembali</a>
                    </form>
    
    
                    <form action="#" class="sign-up-form" id="formLogin">
                        <h2 class="title"> Ganti Password </h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" required placeholder="Username" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" required placeholder="Email" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" required placeholder="Password Baru" />
                        </div>
                        <input type="submit" class="btn-login" value="Ganti" />
                        <a href="#/" class="text-primary login-back-btn">Kembali</a>
                    </form>
                </div>
            </div>
    
            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h3 class="font-login"> Lupa sandi? </h3>
                        <p class="font-login">
                            Jika anda melupakan sandi anda dapat menggunakan tautan berikut untuk mereset sandi anda menjadi baru!
                        </p>
                        <button class="btn transparent rounded-5 font-login" id="sign-up-btn">
                            DISINI
                        </button>
                    </div>
                    <img src="./log.svg" class="image" alt="" />
                </div>
                <div class="panel right-panel">
                    <div class="content">
                        <h3 class="font-login"> Aman?</h3>
                        <p class="font-login">
                            Jika sandi anda sudah aman, maka kembalilah ke halaman login dan Selamat Bekerja :)
                        </p>
                        <button class="btn transparent rounded-5 font-login" id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src="./register.svg" class="image" alt="" />
                </div>
            </div>
        </div>
    `;
  },

  async afterRender() {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container-login');

    sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
    });

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode');
    });

    // Login admin
    const adminLoginForm = document.querySelector('.sign-in-form');
    const adminUsernameInput = adminLoginForm.querySelector('#username-admin');
    const adminPasswordInput = adminLoginForm.querySelector('#pass-admin');
    const adminLoginButton = adminLoginForm.querySelector('#submit-admin');

    adminLoginButton.addEventListener('click', (event) => {
      event.preventDefault();

      const adminUsername = adminUsernameInput.value;
      const adminPassword = adminPasswordInput.value;

      if (adminUsername === 'admin' && adminPassword === 'admin123') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Session.isAdmin();
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        window.location.href = '#/dashboard-admin';
      } else if (adminUsername !== 'admin' || adminPassword !== 'admin123') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Invalid Login',
        });
      }
    });

    // Form ganti password
    const changePasswordForm = document.querySelector('.sign-up-form');
    const usernameInput = changePasswordForm.querySelector('input[type="text"]');
    const emailInput = changePasswordForm.querySelector('input[type="email"]');
    const newPasswordInput = changePasswordForm.querySelector('input[type="password"]');
    const changePasswordButton = changePasswordForm.querySelector('input[type="submit"]');

    changePasswordButton.addEventListener('click', (event) => {
      event.preventDefault();

      const username = usernameInput.value;
      const email = emailInput.value;
      const newPassword = newPasswordInput.value;

      const mailtoLink = 'mailto:legendm804@gmail.com'
    + '?subject=Ganti Password'
    + `&body=Username: ${username
    }%0D%0AEmail: ${email
    }%0D%0APassword Baru: ${newPassword}`;

      window.open(mailtoLink, '_self');

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Berhasil, Silahkan Kirim email',
      });
    });
  },
};

export default LoginPage;
