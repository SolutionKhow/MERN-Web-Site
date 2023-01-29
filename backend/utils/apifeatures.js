

class Apifeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }

///Search Product with keyword

    search(){
        const keyword=this.queryString.keyword?{
             name:{
                $regex:this.queryString.keyword,
                $options:"i"
            }
        }:{
           
        };
       // console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
       
    }
    filter(){
        const queryCopy={...this.queryString};
        console.log(queryCopy);

        //Remove item from Query String


        const RemoveItems=['keyword','page','limit'];

        RemoveItems.forEach(n=>{
            delete queryCopy[n];
        });
   
        let queryCopy1=JSON.stringify(queryCopy);
        
        this.query=this.query.find(queryCopy);
        return this;
    }
    pagination(resultPerPage){
      const curentPage=  Number (this.queryString.page) || 1;
      const skip=resultPerPage*(curentPage-1);
      
      this.query=this.query.limit(resultPerPage).skip(skip);
      return this;

    }
}




module.exports=Apifeatures