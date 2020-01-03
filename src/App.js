import React from 'react';
import './App.css';
import Game from './Game'
import cookieForm from './cookieForm';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
    this.game = new Game()   // Game sınıfından obje oluşturduk.
  }

  //****************************************************************** */
  // Oyunu  ms de bir render etmemizi sağlıyor.
  componentDidMount(){
    setInterval(()=>{
      this.game.update();
      this.setState({});
    }, 100)
  }

  update = () => {
    this.game.update();
  }
  //******************************************************************* */

  
  render(){
  return (
    <div className="App">
      <div>
      <header className="App-header">
       
      <p></p>
      </header>
      <a></a>
    <div className ="style">
      {this.game.currentKurabiye}   
      <div>   
        <button 
        disabled={this.game.malzeme < this.game.kurabiyeMaaliyet} 
        onClick={() => this.game.kurabiyeYap()}> Kurabiye Yap </button>  
      </div>
      <br></br>
      <div>
        <div>Muhasebe</div>  
        <hr />
        <div >
          <table>
            <tr>
              <td style = {{width : "150px"}}>Kasadaki Para:</td>
              <td>{this.game.para} TL</td>    
            </tr>
            <tr>
              <td>Kalan Kurabiye:</td>
              <td>{this.game.currentKurabiye}</td>   
            </tr>
            <tr>
              <td>Kurabiyenin Fiyatı:</td> 
              <td>{this.game.kurabiyeninFiyati} TL

              <button style = {{marginLeft:"30px"}}
              onClick = {this.game.kurabiyeninFiyatiniArttir}> + </button>
              
              <button style = {{marginLeft:"10px"}}
              onClick = {this.game.kurabiyeninFiyatiniAzalt}> - </button>
              </td>
            </tr>
            <tr>
              <td>Halkın Talebi:</td>
              <td>%{this.game.halkinTalebi}</td>  
            </tr>
          </table>
        </div>
        <p></p>
        <div>
          İşçiler
          <hr />
          <tr>
              <td>Çırak: 
              {this.game.uretimdeCalisanlar.cirak}</td>
              <td>
                <button style = {{marginLeft:"10px"}}
                disabled={!this.game.calisanAlabilirMi("CIRAK")}
                onClick = {() => this.game.uretimeCalisanAl("CIRAK")}> 
                Satın Al ({this.game.uretimdeCalisanlar.cirakUcreti}) TL </button> </td>   
          </tr>
          <tr>
              <td>Kalfa: 
              {this.game.uretimdeCalisanlar.kalfa}</td>
              <td> 
                <button style = {{marginLeft:"10px"}}
                disabled={!this.game.calisanAlabilirMi("KALFA")}
                onClick = {() => this.game.uretimeCalisanAl("KALFA")}> 
                Satın Al ({this.game.uretimdeCalisanlar.kalfaUcreti}) TL </button> </td>   
          </tr>
          <tr>
              <td>UstaBaşı: 
              {this.game.uretimdeCalisanlar.usta}</td>
              <td>
                <button style = {{marginLeft:"10px"}}
                disabled={!this.game.calisanAlabilirMi("USTA")}
                onClick = {() => this.game.uretimeCalisanAl("USTA")}> 
                Satın Al ({this.game.uretimdeCalisanlar.ustaUcreti}) TL </button> </td>   
          </tr>
        </div>
        <p></p>
        <div>Pazar</div>
        <hr />
        <table>
            <tr>
              <td style = {{width : "150px"}}></td>
              <td></td>    
            </tr>
            <tr>
              <td>Malzeme Al:</td>
              <td>{this.game.malzeme} gr
              <button style = {{marginLeft:"10px"}}
              disabled={!this.game.malzemeSatinAlabilirMi()}  // Eğer kasada para yoksa malzeme alamaz
              onClick = {this.game.malzemeAl}> Satın Al ({this.game.malzemeSatinAl}) TL </button> </td>   
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
        </table>
        </div>
      </div>
    </div> 
  </div>  
  )
}
}
export default App;
