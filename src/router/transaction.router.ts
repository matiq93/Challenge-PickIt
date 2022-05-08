import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { TransactionController } from "../controller/transaction.controller";
import { TransactionMiddleware } from "../middleware/transaction.middleware";
import { BaseRouter } from "./router";

export class TransactionRouter extends BaseRouter<TransactionController,TransactionMiddleware> {
  constructor() {
    super(TransactionController, TransactionMiddleware);
  }

  routes(): void {
    this.router.get("/transaction/historical/:car_id",
      param("car_id", "id de auto no valido").isNumeric(),
      this.middleware.validateFields,
      param("car_id").custom((car_id) => this.middleware.validateCarExist(car_id)),
      this.middleware.validateFields,
      (req: Request, resp: Response) => this.controller.getCarTransactions(req, resp)
    );

    this.router.post("/transaction",
      //validaciones de contenido y formato
      body("car_id", "id de auto no valido").isNumeric(),
      body("transactions").isArray(),
      body("transactions.*.service_id","id de servicio debe ser numerico").isNumeric(),
      body("transactions.*.unit_price","precio unitario debe ser numerico").isNumeric(),
      this.middleware.validateFields,
      //Validaciones de existencia
      body("car_id").custom((car_id) => this.middleware.validateCarExist(car_id)),
      this.middleware.validateFields,
      //validacion de integridad de datos de request
      body().custom((body) => this.middleware.validateCreateRequest(body)),
      this.middleware.validateFields,
      (req: Request, resp: Response) => this.controller.createTransaction(req, resp)
    );
  }
}
