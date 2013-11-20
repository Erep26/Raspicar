/* Calcula els FPS del joc, en principi aquest arxiu esta desabilitat ja que l'usuari no te per que saver a quina velocitat
 * es mou el joc o almenys no haria de ser una opcio per defecte habilitada
*/
window.fpscal = (function(){//contador fps
        return function()
        {
                this.fps = 1000 / (new Date().getTime() - this.lastRun);//fps= 1 segon /diferencia de temps entre 2 frames
                this.lastRun = new Date().getTime();
                return this.fps;        
        }
})();