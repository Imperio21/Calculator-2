import React, { Component } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

// função dos estados iniciais
const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      // manipulando o segundo indice do estado e limpando o display
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      // processando a operação para o resultado ser gerado
      const equals = operation === "=";
      // pegando a operação anterior caso precise
      const currentOperation = this.state.operation;
      // clonado os valores e calculando
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
      //limpando o primeiro valor e armazenando no estado
      values[1] = 0;
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    // função para evitar dois pontos na calculadora
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    // limpando o display em duas situações
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    // adicionando o valor no display quando o clear for false
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    // adicionando o valor no display
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      // pegando o indice do valor que estou alterando
      const i = this.state.current;
      // converti para floar
      const newValue = parseFloat(displayValue);
      // clonei os valores dentro de um novo array
      const values = [...this.state.values];
      // alterei o valor atual
      values[i] = newValue;
      //subistitui o novo array dentro do estado
      this.setState({ values });
      console.log(values);
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="Ac" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
