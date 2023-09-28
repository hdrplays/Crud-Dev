import React from "react"
import { Table, Button, Form, Modal } from "react-bootstrap";
import "../App.css";

function Home(){
    return(
        <div>
            <body className="bodyHome">
                <div class="containerHome">
                    <section class="sectionHome">
                        <h2 className="h2Home">Desenvolvedores</h2>
                        <ul className="ulHome">
                            <li className="liHome"><a href="desenvolvedores.html" class="buttonHome">Ver Desenvolvedores</a></li>
                            <li className="liHome"><a href="cadastro_desenvolvedor.html" class="buttonHome">Cadastrar Desenvolvedor</a></li>
                        </ul>
                    </section>
                    <section class="sectionHome">
                        <h2 className="h2Home">Níveis</h2>
                        <ul className="ulHome">
                            <li className="liHome"><a href="niveis.html" class="buttonHome">Ver Níveis</a></li>
                            <li className="liHome"><a href="cadastro_nivel.html" class="buttonHome">Cadastrar Nível</a></li>
                        </ul>
                    </section>
                </div>
            </body>
        </div>
    )
}

export default Home;