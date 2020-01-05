import Calcul from "../src/Calcul";
describe("Calcul",()=>{
    it('should retoun 13', function(){
        
        let a:number = 8;
        let b:number = 5;
        let expected=13;
        
        expect(Calcul.somme(a,b)).toBe(expected);
    });
});