<?php include( 'include/admin-header.php'); ?>
<!----------------COntent start-------------->
<section id="content-wrapper">
   <div class="container-fluid">
      <div class="row p-t-b-20">
         <div class="col-md-12">
            <div class="form-card no-b">
               <div class="login-form-card">
                  <h3 class="add_name">Manage Order</h3>
                   <!-- <a href="add-operator.php" class="add-btn "  style="position: absolute;top: 7%;right: 4%;"><i class="fa fa-plus mr-5"></i>Add</a> -->
                        <div class="date-pickers">
                  <div class="form-group">
          <label for="inputDate" class="set_dates">Date</label>
          <input type="input" class="form-control" id="inputDate">
        </div>
        &nbsp;
        <div class="form-group">
          
          <input type="input" class="form-control" id="inputDate-1">
        </div>
           
             </div>
             <form style="padding: 15px 0;position: relative;top: 8px;left: 71%;">
                <label class="searchh">Search:<input type="search" class="form-control" placeholder="" aria-controls="example"></label>
             </form>
             <div style="position: relative;bottom: 36px;">
                 <div class="div-table">
                  <div class="table-responsive">
                     <table id="example" class="table table-striped " style="width:100%">
                        <thead>
                           <tr>
                              <th class="question-1"><input type="checkbox" name="">&nbsp; Payment Date</th>
                              <th>Customer Name</th>
                              <th>Customer Phone Number</th>
                              <th>Customer Email</th>
                              <th>Amount Paid</th>
                              <th>Payment Status</th>
                              
                        
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
          
                              <td ><input type="checkbox" name="">01/01/2021</td>
                              <td>Harsh Tomar</td>
                              <td>9878765432</td>
                              <td>harsh@gmail.com</td>
                              <td>2000</td>
                              <td>
    <button class="btn btn-success pushme2 with-color btn-danger">PAID</button>
    </td>
                             <!--  <td><label class=" badge badge-success">Paid</label></td> -->
             <!--   <td>
                              <label class="badge badge-gradient-info">Active</label>
                            </td>
                              <td >
                                 <table class="act-button">
                                    <tr>
                                                    <td><div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitches">
  <label class="custom-control-label" for="customSwitches"></label>
</div></td>
                                       <td ><a href=""data-toggle="modal" data-target="#exampleModal" title="Edit" class="btn-edit "><span class="fa fa-pencil"></span></a></td>
                                    </tr>
                                 </table>
                              </td> -->
                           </tr>
                            <tr>
          
                              <td ><input type="checkbox" name="">01/01/2021</td>
                              <td>Harshtomar</td>
                              <td>9878765432</td>
                              <td>harsh@gmail.com</td>
                              <td>2000</td>
                                                 <td>
    <button class="btn btn-success pushme2 with-color btn-danger">PAID</button>
    </td>
                     <!--  <td>
                              <label class="badge badge-gradient-info">Active</label>
                            </td>
                              <td >
                                 <table class="act-button">
                                    <tr>
                                                    <td><div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitches">
  <label class="custom-control-label" for="customSwitches"></label>
</div></td>
                                       <td ><a href=""data-toggle="modal" data-target="#exampleModal" title="Edit" class="btn-edit "><span class="fa fa-pencil"></span></a></td>
                                    </tr>
                                 </table>
                              </td> -->
                           </tr>
                        </tbody>
                     </table>
                  </div>
                </div>
              </div>
               <div class="row">
                <div class="col-md-12 ">
               
                    
                    <nav>
                      <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#"><i class="mdi mdi-chevron-left"></i></a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#"><i class="mdi mdi-chevron-right"></i></a></li>
                      </ul>
                    </nav>
                  
              </div>
              </div>
                  &nbsp;
                   <div class="dropdown">
  <button class="btn btn-primary " type="button" aria-haspopup="true" aria-expanded="false">
    Delete 
  </button>
</div>
               </div>
            </div>
         </div>
      </div>
   </div>



</section>











<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header" style="background: #2088ca;">
        <h5 class="modal-title" id="exampleModalLabel">Add Cost</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <form>
         <label>Manage Content</label>
         <input type="text" name="" class="form-control" placeholder="price">
         <br>
          <label>Manage Price</label>
         <input type="text" name="" class="form-control" placeholder="price">

       </form>
       <br>
       <button class="btn btn-primary">Update</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary"data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
<?php include( 'include/admin-footer.php'); ?>