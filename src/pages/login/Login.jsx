import "./Login.css"
import "../../styles/variables.css"
export default function Login() {
  return (
    <main className="Login">
      <section className="Login__panel" aria-label="Inicio de sesión">
        <div className="Login__illustration" aria-hidden="true">
          <svg className="Login__art" viewBox="0 0 520 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="242" cy="548" rx="190" ry="14" fill="var(--color-rosaEmpol)" opacity=".34" />
            {/* Person */}
            <path d="M113 175c-15 15-27 40-34 69l-18 79 29 12 34-79 17-50-28-31Z" fill="var(--color-rosaTerra)" />
            <path d="m67 319-20 131c-4 29-1 54 13 58 15 4 25-22 31-49l29-125-53-15Z" fill="var(--color-rosaTerra)" />
            <path d="m114 324-2 127c0 26 7 53 22 54 15 1 20-27 20-51l8-131-48 1Z" fill="var(--color-rosaTerra)" />
            <path d="m53 501 18 5-7 16c-3 7-11 12-20 11l-17-1c-5 0-7-5-4-9 8-10 19-16 30-22Zm80 0 15-1 6 16c3 8 10 13 19 14l14 1c6 1 8-6 3-10-10-9-24-15-38-19l-19-1Z" fill="var(--color-carbon)" />
            <path d="m111 176 37 5 27 63-17 94-63-9-12-93 28-60Z" fill="var(--color-cremita)" />
            <path d="m117 175 24 3 10 24-20 43-27-39 13-31Z" fill="var(--color-rosaEmpol)" />
            <path d="m105 245 27 18-17 17-11-19-10 19-8-16 19-19Z" fill="var(--color-blancaso)" />
            <path d="m104 255 22 9-13 30-18-5 9-34Z" fill="var(--color-carbon)" />
            <path d="M118 166c-6-19-1-44 13-59 11-10 25-11 34-3 11 10 10 28 1 44l-12 22-36-4Z" fill="var(--color-carbon)" />
            <path d="M132 118c-18 10-24 29-17 44 5 11 17 18 29 16 13-2 23-14 25-27l-1-23-36-10Z" fill="var(--color-rosaEmpol)" />
            <path d="M126 136c-6-13-1-28 10-37 11-9 27-10 38-2 10 7 11 22 4 32-7-7-14-11-24-11-9 11-17 17-28 18Z" fill="var(--color-carbon)" />
            <path d="m159 150 13-4-5 12-9 2 1-10Z" fill="var(--color-rosaTerra)" />
            <path d="m113 180 13 4-4 32-13 17-8-20 12-33Z" fill="var(--color-rosaEmpol)" />
            <path d="m104 205 25 4-8 18-17-4-8 15-12-9 20-24Z" fill="var(--color-cremita)" />
            {/* Rack */}
            <path d="M224 164h219M229 164l-4 347m211-347 16 347M221 511h235" stroke="var(--color-bordoVino)" strokeWidth="6" strokeLinecap="round" />
            <path d="m230 165 8-18 195 1 8 17" stroke="var(--color-bordoVino)" strokeWidth="5" strokeLinejoin="round" />
            <path d="m255 174 10 31m36-31 7 31m33-31 9 31m33-31 8 31m33-31 7 31" stroke="var(--color-bordoVino)" strokeWidth="2" />
            {/* Clothes */}
            <path d="M262 204h34l8 22-2 169-47-3 2-163 5-25Z" fill="var(--color-rosaEmpol)" />
            <path d="m273 204 7 22-5 164m7-163 13-23" stroke="var(--color-rosaTerra)" strokeWidth="2" />
            <path d="M303 204h41l9 23-6 145-55-1 5-143 6-24Z" fill="var(--color-rosaTerra)" opacity=".78" />
            <path d="m313 206 10 20-2 145m9-145 12-20" stroke="var(--color-cremita)" strokeWidth="2" />
            <path d="M349 205h43l13 23-4 161-63-2 5-163 6-19Z" fill="var(--color-carbon)" />
            <path d="M345 250h52m-54 20h54m-55 20h55m-56 20h55m-56 20h54" stroke="var(--color-cremita)" strokeWidth="9" />
            <path d="M399 219c12 3 18 12 19 25l2 22-21 12-23-14 5-28c2-10 8-16 18-17Z" fill="var(--color-bordoVino)" />
            <path d="m394 218-2-11 13-1 2 12m-14-11c0-8 13-8 13 0" stroke="var(--color-bordoVino)" strokeWidth="3" />
            {/* Shoes and boxes */}
            <path d="m246 464 37 1c9 0 15 8 12 16l-3 7-52-1c-5 0-7-5-4-9l10-14Zm53-1h33c9 0 15 7 14 16l-1 8-53-1c-5 0-7-5-4-9l11-14Z" fill="var(--color-carbon)" />
            <path d="M350 461h63v47h-63z" fill="var(--color-rosaEmpol)" />
            <path d="M350 461h63v10h-63z" fill="var(--color-rosaTerra)" />
            {/* Plant */}
            <path d="M435 501c-4-57 4-112 22-160m-12 93c-21-14-29-29-28-45 19 5 32 19 34 38m3-34c0-22 8-38 23-49 5 19-1 37-19 52m-25-2c-17-19-20-37-13-54 17 10 25 26 23 47m9-37c7-21 20-33 39-36 0 20-11 35-34 44m-28 72c-16-13-22-28-17-43 16 8 24 20 24 37" fill="var(--color-verde)" />
            <path d="m426 502 50 1-7 39c-2 12-33 12-36 0l-7-40Z" fill="var(--color-rosaEmpol)" />
            <path d="M432 510h39" stroke="var(--color-rosaTerra)" strokeWidth="3" />
          </svg>
        </div>

        <div className="Login__formulario">
          <header className="Login__encabezado">
            <h1 className="Login__titulo">Inicio de sesión</h1>
            <p className="Login__subtitulo">Iniciá sesión y volvé al lugar donde tu estilo<br />habla por vos.</p>
          </header>

          <form className="Login__form">
            <label className="Login__label" htmlFor="login-email">Email</label>
            <div className="Login__campo">
              <span className="Login__icono" aria-hidden="true">✉</span>
              <input id="login-email" className="Login__input" type="email" placeholder="ejemplo@gmail.com" />
            </div>

            <label className="Login__label Login__label--conMargen" htmlFor="login-password">Contraseña</label>
            <div className="Login__campo">
              <span className="Login__icono" aria-hidden="true">♙</span>
              <input id="login-password" className="Login__input" type="password" placeholder="ejemplocontraseña" />
              <span className="Login__icono Login__icono--final" aria-hidden="true">⌁</span>
            </div>

            <a className="Login__enlace Login__enlace--olvido">¿Se te olvidó la contraseña?</a>
            <button className="Login__boton Login__boton--principal" type="button">Iniciar sesión</button>
          </form>

          <div className="Login__separador"><span>o continuar con</span></div>
          <button className="Login__boton Login__boton--google" type="button"><span className="Login__googleIcon" aria-hidden="true">G</span>Google</button>
          <p className="Login__registro">¿No tienes cuenta? <a className="Login__enlace">Regístrate</a></p>
        </div>
      </section>
    </main>
  )
}
