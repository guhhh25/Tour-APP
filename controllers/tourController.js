const fs = require('fs');
const Tour = require('./../models/tourModel')



  //middleware to check ID, so he can use next / value
  // exports.checkId = (req, res,next,value) => {
  //   if(req.params.id * 1 > tours.length){
  //     return res.status(404).json({
  //       status:'fail',
  //       message:'Invalid ID'
  //     })
  //   }
  //   next()
  // }

  //middleware to check req body, so he can use next / value

  // exports.checkBody = (req, res, next) => {
  //   if(!req.body.name || !req.body.price){
  //    return res.status(400).json({
  //       status:"failed",
  //       message:"invalid name or price :("
  //     })
  //   }
  //   next()
  // }  
  
  exports.getAllTours = async (req, res) => {
    try{

      const tours =  await Tour.find()   //se find estiver vazio, puxa todos 
      res.status(200).json({
        status: 'sucess',
        results: tours.length,
        data: {
          tours: tours,
        },
      });
    }catch(err){
      res.status(404).json({
        status:"failed",
        message:err
      })
    }
  };
  
  exports.getTourById =  async (req, res) => {
    try{
      const tour = await Tour.findById(req.params.id)
      res.status(200).json({
        status:"sucess",
            data: {
              tour:tour
            }
          })

    }catch(e){
      console.log(e)
    }


    } 
    
    exports.newTour = async (req, res) => {
      try{
        const newTour = await Tour.create(req.body)
        res.status(200).json({
          status: 'sucess',
          data: {
            tour: newTour,
          },
        });

      }catch(err){
        res.status(400).json({
          status:"fail",
          message:"Invalid data sent"
        })
      }
      
        }
        
      
      
      exports.editTourById = async (req, res) => {

        try{
          const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // novo documento atualizado
            runValidators:true
          })

          res.status(200).json({
            status: 'sucess',
            data: {
              tour
            },
          });
        }catch(err){
          console.log(err)
        }
      };
      
      exports.deleteTourById = async (req, res) => {
        try{
           await Tour.findByIdAndDelete(req.params.id) // n precisa de variavel pq nao manda nada
          res.send({
            status: 'sucess',
            data: {
              message:"tour deleted!",

            },
          });
        }catch(err){
          console.log(err)
        }
        

      };