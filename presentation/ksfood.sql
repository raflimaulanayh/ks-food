-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2026 at 04:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ksfood`
--

-- --------------------------------------------------------

--
-- Table structure for table `ms_address`
--

CREATE TABLE `ms_address` (
  `addressId` varchar(20) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `label` varchar(50) NOT NULL,
  `fullAddress` text NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `postalCode` varchar(10) NOT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `isPrimary` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_category`
--

CREATE TABLE `ms_category` (
  `categoryId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_corporate`
--

CREATE TABLE `ms_corporate` (
  `corporateId` varchar(20) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `taxIdentificationNumber` varchar(50) NOT NULL,
  `personInChargeName` varchar(100) NOT NULL,
  `personInChargePhone` varchar(15) NOT NULL,
  `creditLimit` decimal(12,2) NOT NULL DEFAULT 0.00,
  `paymentTermDays` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_customer`
--

CREATE TABLE `ms_customer` (
  `customerId` varchar(20) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `type` enum('CORPORATE','RETAIL') NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_department`
--

CREATE TABLE `ms_department` (
  `departmentId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_employee`
--

CREATE TABLE `ms_employee` (
  `employeeId` varchar(20) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `departmentId` varchar(15) NOT NULL,
  `positionId` varchar(15) NOT NULL,
  `identificationNumber` varchar(20) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_expedition`
--

CREATE TABLE `ms_expedition` (
  `expeditionId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `serviceType` varchar(30) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_material`
--

CREATE TABLE `ms_material` (
  `materialId` varchar(20) NOT NULL,
  `materialCode` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `unitOfMeasurement` varchar(20) NOT NULL,
  `minimumStockAlert` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_packaging`
--

CREATE TABLE `ms_packaging` (
  `packagingId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `materialType` varchar(30) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_payment_method`
--

CREATE TABLE `ms_payment_method` (
  `paymentMethodId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `provider` varchar(50) NOT NULL,
  `accountNumber` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_position`
--

CREATE TABLE `ms_position` (
  `positionId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_product`
--

CREATE TABLE `ms_product` (
  `productId` varchar(20) NOT NULL,
  `categoryId` varchar(15) NOT NULL,
  `packagingId` varchar(15) NOT NULL,
  `stockKeepingUnit` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `basePrice` decimal(10,2) NOT NULL,
  `unitOfMeasurement` varchar(20) NOT NULL,
  `weightInGrams` int(11) NOT NULL,
  `cachedTotalStock` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_promotion`
--

CREATE TABLE `ms_promotion` (
  `promotionId` varchar(20) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('DISCOUNT_PERCENTAGE','DISCOUNT_NOMINAL','FREE_SHIPPING') NOT NULL,
  `discountValue` decimal(10,2) NOT NULL,
  `minimumPurchase` decimal(12,2) NOT NULL DEFAULT 0.00,
  `maximumDiscount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `usageQuota` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_purchase_agreement`
--

CREATE TABLE `ms_purchase_agreement` (
  `agreementId` varchar(20) NOT NULL,
  `corporateId` varchar(20) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `status` enum('DRAFT','ACTIVE','EXPIRED','TERMINATED') NOT NULL DEFAULT 'DRAFT',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_purchase_agreement_item`
--

CREATE TABLE `ms_purchase_agreement_item` (
  `agreementItemId` varchar(25) NOT NULL,
  `agreementId` varchar(20) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `negotiatedPrice` decimal(10,2) NOT NULL,
  `minimumOrderQuantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_retail`
--

CREATE TABLE `ms_retail` (
  `retailId` varchar(20) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `loyaltyPoint` int(11) NOT NULL DEFAULT 0,
  `birthDate` date DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_role`
--

CREATE TABLE `ms_role` (
  `roleId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_sales_channel`
--

CREATE TABLE `ms_sales_channel` (
  `channelId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `platformFeePercentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_setting`
--

CREATE TABLE `ms_setting` (
  `settingId` int(11) NOT NULL,
  `settingKey` varchar(50) NOT NULL,
  `settingValue` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_supplier`
--

CREATE TABLE `ms_supplier` (
  `supplierId` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `contactName` varchar(100) NOT NULL,
  `contactPhone` varchar(15) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_tax`
--

CREATE TABLE `ms_tax` (
  `taxId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ratePercentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_user`
--

CREATE TABLE `ms_user` (
  `userId` varchar(20) NOT NULL,
  `roleId` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastLoginDate` datetime DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_warehouse`
--

CREATE TABLE `ms_warehouse` (
  `warehouseId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `capacity` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_cart`
--

CREATE TABLE `tr_cart` (
  `cartId` varchar(25) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_cart_item`
--

CREATE TABLE `tr_cart_item` (
  `cartItemId` varchar(25) NOT NULL,
  `cartId` varchar(25) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_material_batch`
--

CREATE TABLE `tr_material_batch` (
  `materialBatchId` varchar(25) NOT NULL,
  `materialId` varchar(20) NOT NULL,
  `warehouseId` varchar(15) NOT NULL,
  `batchNumber` varchar(50) NOT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT 0.00,
  `productionDate` date NOT NULL,
  `expirationDate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_notification`
--

CREATE TABLE `tr_notification` (
  `notificationId` varchar(25) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_order`
--

CREATE TABLE `tr_order` (
  `orderId` varchar(25) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `addressId` varchar(20) NOT NULL,
  `taxId` varchar(15) NOT NULL,
  `channelId` varchar(15) NOT NULL,
  `agreementId` varchar(20) DEFAULT NULL,
  `orderDate` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('PENDING_PAYMENT','PENDING_APPROVAL','PROCESSING','READY_TO_SHIP','SHIPPED','DELIVERED','COMPLETED','CANCELED','RETURNED') NOT NULL DEFAULT 'PENDING_PAYMENT',
  `clientPurchaseOrderNumber` varchar(50) DEFAULT NULL,
  `subtotalAmount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `shippingCost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discountAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `taxAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `grandTotalAmount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `refundAmount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `cancelReason` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_order_item`
--

CREATE TABLE `tr_order_item` (
  `orderItemId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotalAmount` decimal(12,2) NOT NULL,
  `itemNotes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_order_promo`
--

CREATE TABLE `tr_order_promo` (
  `orderPromoId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `promotionId` varchar(20) NOT NULL,
  `discountAmount` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_payment`
--

CREATE TABLE `tr_payment` (
  `paymentId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `paymentMethodId` varchar(15) NOT NULL,
  `paymentDate` datetime NOT NULL,
  `paidAmount` decimal(12,2) NOT NULL,
  `status` enum('PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `referenceNumber` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_procurement`
--

CREATE TABLE `tr_procurement` (
  `procurementId` varchar(25) NOT NULL,
  `supplierId` varchar(20) NOT NULL,
  `purchaseOrderDate` date NOT NULL,
  `expectedArrivalDate` date DEFAULT NULL,
  `status` enum('DRAFT','SENT_TO_SUPPLIER','PARTIAL_RECEIVED','COMPLETED','CANCELED') NOT NULL DEFAULT 'DRAFT',
  `totalAmount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_procurement_item`
--

CREATE TABLE `tr_procurement_item` (
  `procurementItemId` varchar(25) NOT NULL,
  `procurementId` varchar(25) NOT NULL,
  `materialId` varchar(20) NOT NULL,
  `orderedQuantity` decimal(10,2) NOT NULL,
  `receivedQuantity` decimal(10,2) NOT NULL DEFAULT 0.00,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_production_material_usage`
--

CREATE TABLE `tr_production_material_usage` (
  `materialUsageId` varchar(25) NOT NULL,
  `productionOrderId` varchar(25) NOT NULL,
  `materialBatchId` varchar(25) NOT NULL,
  `usedQuantity` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_production_order`
--

CREATE TABLE `tr_production_order` (
  `productionOrderId` varchar(25) NOT NULL,
  `employeeId` varchar(20) NOT NULL,
  `plannedDate` datetime NOT NULL,
  `actualDate` datetime DEFAULT NULL,
  `status` enum('PLANNED','IN_PROGRESS','QUALITY_CONTROL','COMPLETED','CANCELED') NOT NULL DEFAULT 'PLANNED',
  `qualityControlStatus` enum('PENDING','PASSED','FAILED') NOT NULL DEFAULT 'PENDING',
  `notes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_production_result`
--

CREATE TABLE `tr_production_result` (
  `productionResultId` varchar(25) NOT NULL,
  `productionOrderId` varchar(25) NOT NULL,
  `productBatchId` varchar(25) NOT NULL,
  `producedQuantity` int(11) NOT NULL,
  `rejectedQuantity` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_product_batch`
--

CREATE TABLE `tr_product_batch` (
  `productBatchId` varchar(25) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `warehouseId` varchar(15) NOT NULL,
  `batchNumber` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `productionDate` date NOT NULL,
  `expirationDate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_product_review`
--

CREATE TABLE `tr_product_review` (
  `reviewId` varchar(25) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `rating` int(11) NOT NULL,
  `reviewComment` text DEFAULT NULL,
  `mediaUrl` text DEFAULT NULL,
  `isAnonymous` tinyint(1) NOT NULL DEFAULT 0,
  `adminReply` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_product_stock_movement`
--

CREATE TABLE `tr_product_stock_movement` (
  `movementId` varchar(25) NOT NULL,
  `productBatchId` varchar(25) NOT NULL,
  `warehouseId` varchar(15) NOT NULL,
  `movementType` enum('IN','OUT','ADJUSTMENT') NOT NULL,
  `quantity` int(11) NOT NULL,
  `referenceType` enum('PRODUCTION','ORDER','RETURN','OPNAME','MANUAL') NOT NULL,
  `referenceId` varchar(25) DEFAULT NULL,
  `movementDate` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_return`
--

CREATE TABLE `tr_return` (
  `returnId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `employeeId` varchar(20) DEFAULT NULL,
  `returnDate` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('REQUESTED','REVIEWING','APPROVED','REJECTED','RECEIVED_IN_WAREHOUSE','RESOLVED') NOT NULL DEFAULT 'REQUESTED',
  `resolutionType` enum('REFUND_MONEY','PRODUCT_REPLACEMENT','STORE_CREDIT') DEFAULT NULL,
  `customerNotes` text DEFAULT NULL,
  `adminNotes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_return_item`
--

CREATE TABLE `tr_return_item` (
  `returnItemId` varchar(25) NOT NULL,
  `returnId` varchar(25) NOT NULL,
  `orderItemId` varchar(25) NOT NULL,
  `returnedQuantity` int(11) NOT NULL,
  `returnReason` enum('DAMAGED_PACKAGING','EXPIRED','WRONG_ITEM','QUALITY_ISSUE') NOT NULL,
  `receivedCondition` enum('DEFECT','GOOD','EXPIRED','DESTROYED') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_shipment`
--

CREATE TABLE `tr_shipment` (
  `shipmentId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `expeditionId` varchar(15) NOT NULL,
  `airwayBillNumber` varchar(50) DEFAULT NULL,
  `status` enum('MANIFESTED','IN_TRANSIT','DELIVERED','RETURNED') NOT NULL DEFAULT 'MANIFESTED',
  `estimatedDeliveryDate` date DEFAULT NULL,
  `actualDeliveryDate` date DEFAULT NULL,
  `trackingUrl` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_stock_opname`
--

CREATE TABLE `tr_stock_opname` (
  `opnameId` varchar(25) NOT NULL,
  `warehouseId` varchar(15) NOT NULL,
  `employeeId` varchar(20) NOT NULL,
  `opnameDate` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('DRAFT','REVIEWING','APPROVED','REJECTED') NOT NULL DEFAULT 'DRAFT',
  `notes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_stock_opname_item`
--

CREATE TABLE `tr_stock_opname_item` (
  `opnameItemId` varchar(25) NOT NULL,
  `opnameId` varchar(25) NOT NULL,
  `productBatchId` varchar(25) NOT NULL,
  `systemQuantity` int(11) NOT NULL,
  `actualQuantity` int(11) NOT NULL,
  `differenceQuantity` int(11) NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ms_address`
--
ALTER TABLE `ms_address`
  ADD PRIMARY KEY (`addressId`),
  ADD KEY `customerId` (`customerId`);

--
-- Indexes for table `ms_category`
--
ALTER TABLE `ms_category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `ms_corporate`
--
ALTER TABLE `ms_corporate`
  ADD PRIMARY KEY (`corporateId`),
  ADD UNIQUE KEY `uk_corp_cust` (`customerId`);

--
-- Indexes for table `ms_customer`
--
ALTER TABLE `ms_customer`
  ADD PRIMARY KEY (`customerId`),
  ADD UNIQUE KEY `uk_cust_user` (`userId`);

--
-- Indexes for table `ms_department`
--
ALTER TABLE `ms_department`
  ADD PRIMARY KEY (`departmentId`);

--
-- Indexes for table `ms_employee`
--
ALTER TABLE `ms_employee`
  ADD PRIMARY KEY (`employeeId`),
  ADD UNIQUE KEY `uk_emp_user` (`userId`),
  ADD KEY `departmentId` (`departmentId`),
  ADD KEY `positionId` (`positionId`);

--
-- Indexes for table `ms_expedition`
--
ALTER TABLE `ms_expedition`
  ADD PRIMARY KEY (`expeditionId`);

--
-- Indexes for table `ms_material`
--
ALTER TABLE `ms_material`
  ADD PRIMARY KEY (`materialId`);

--
-- Indexes for table `ms_packaging`
--
ALTER TABLE `ms_packaging`
  ADD PRIMARY KEY (`packagingId`);

--
-- Indexes for table `ms_payment_method`
--
ALTER TABLE `ms_payment_method`
  ADD PRIMARY KEY (`paymentMethodId`);

--
-- Indexes for table `ms_position`
--
ALTER TABLE `ms_position`
  ADD PRIMARY KEY (`positionId`);

--
-- Indexes for table `ms_product`
--
ALTER TABLE `ms_product`
  ADD PRIMARY KEY (`productId`),
  ADD UNIQUE KEY `uk_sku` (`stockKeepingUnit`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `packagingId` (`packagingId`);

--
-- Indexes for table `ms_promotion`
--
ALTER TABLE `ms_promotion`
  ADD PRIMARY KEY (`promotionId`),
  ADD UNIQUE KEY `uk_promo_code` (`code`);

--
-- Indexes for table `ms_purchase_agreement`
--
ALTER TABLE `ms_purchase_agreement`
  ADD PRIMARY KEY (`agreementId`),
  ADD KEY `corporateId` (`corporateId`);

--
-- Indexes for table `ms_purchase_agreement_item`
--
ALTER TABLE `ms_purchase_agreement_item`
  ADD PRIMARY KEY (`agreementItemId`),
  ADD KEY `agreementId` (`agreementId`),
  ADD KEY `fk_pa_item_product` (`productId`);

--
-- Indexes for table `ms_retail`
--
ALTER TABLE `ms_retail`
  ADD PRIMARY KEY (`retailId`),
  ADD UNIQUE KEY `uk_ret_cust` (`customerId`);

--
-- Indexes for table `ms_role`
--
ALTER TABLE `ms_role`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `ms_sales_channel`
--
ALTER TABLE `ms_sales_channel`
  ADD PRIMARY KEY (`channelId`);

--
-- Indexes for table `ms_setting`
--
ALTER TABLE `ms_setting`
  ADD PRIMARY KEY (`settingId`),
  ADD UNIQUE KEY `uk_setting_key` (`settingKey`);

--
-- Indexes for table `ms_supplier`
--
ALTER TABLE `ms_supplier`
  ADD PRIMARY KEY (`supplierId`);

--
-- Indexes for table `ms_tax`
--
ALTER TABLE `ms_tax`
  ADD PRIMARY KEY (`taxId`);

--
-- Indexes for table `ms_user`
--
ALTER TABLE `ms_user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `uk_username` (`username`),
  ADD UNIQUE KEY `uk_email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `ms_warehouse`
--
ALTER TABLE `ms_warehouse`
  ADD PRIMARY KEY (`warehouseId`);

--
-- Indexes for table `tr_cart`
--
ALTER TABLE `tr_cart`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `customerId` (`customerId`);

--
-- Indexes for table `tr_cart_item`
--
ALTER TABLE `tr_cart_item`
  ADD PRIMARY KEY (`cartItemId`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `tr_material_batch`
--
ALTER TABLE `tr_material_batch`
  ADD PRIMARY KEY (`materialBatchId`),
  ADD KEY `materialId` (`materialId`),
  ADD KEY `warehouseId` (`warehouseId`);

--
-- Indexes for table `tr_notification`
--
ALTER TABLE `tr_notification`
  ADD PRIMARY KEY (`notificationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `tr_order`
--
ALTER TABLE `tr_order`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `addressId` (`addressId`),
  ADD KEY `taxId` (`taxId`),
  ADD KEY `channelId` (`channelId`),
  ADD KEY `agreementId` (`agreementId`);

--
-- Indexes for table `tr_order_item`
--
ALTER TABLE `tr_order_item`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `tr_order_promo`
--
ALTER TABLE `tr_order_promo`
  ADD PRIMARY KEY (`orderPromoId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `promotionId` (`promotionId`);

--
-- Indexes for table `tr_payment`
--
ALTER TABLE `tr_payment`
  ADD PRIMARY KEY (`paymentId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `paymentMethodId` (`paymentMethodId`);

--
-- Indexes for table `tr_procurement`
--
ALTER TABLE `tr_procurement`
  ADD PRIMARY KEY (`procurementId`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `tr_procurement_item`
--
ALTER TABLE `tr_procurement_item`
  ADD PRIMARY KEY (`procurementItemId`),
  ADD KEY `procurementId` (`procurementId`),
  ADD KEY `materialId` (`materialId`);

--
-- Indexes for table `tr_production_material_usage`
--
ALTER TABLE `tr_production_material_usage`
  ADD PRIMARY KEY (`materialUsageId`),
  ADD KEY `productionOrderId` (`productionOrderId`),
  ADD KEY `materialBatchId` (`materialBatchId`);

--
-- Indexes for table `tr_production_order`
--
ALTER TABLE `tr_production_order`
  ADD PRIMARY KEY (`productionOrderId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `tr_production_result`
--
ALTER TABLE `tr_production_result`
  ADD PRIMARY KEY (`productionResultId`),
  ADD KEY `productionOrderId` (`productionOrderId`),
  ADD KEY `productBatchId` (`productBatchId`);

--
-- Indexes for table `tr_product_batch`
--
ALTER TABLE `tr_product_batch`
  ADD PRIMARY KEY (`productBatchId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `warehouseId` (`warehouseId`);

--
-- Indexes for table `tr_product_review`
--
ALTER TABLE `tr_product_review`
  ADD PRIMARY KEY (`reviewId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `tr_product_stock_movement`
--
ALTER TABLE `tr_product_stock_movement`
  ADD PRIMARY KEY (`movementId`),
  ADD KEY `productBatchId` (`productBatchId`),
  ADD KEY `warehouseId` (`warehouseId`);

--
-- Indexes for table `tr_return`
--
ALTER TABLE `tr_return`
  ADD PRIMARY KEY (`returnId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `tr_return_item`
--
ALTER TABLE `tr_return_item`
  ADD PRIMARY KEY (`returnItemId`),
  ADD KEY `returnId` (`returnId`),
  ADD KEY `orderItemId` (`orderItemId`);

--
-- Indexes for table `tr_shipment`
--
ALTER TABLE `tr_shipment`
  ADD PRIMARY KEY (`shipmentId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `expeditionId` (`expeditionId`);

--
-- Indexes for table `tr_stock_opname`
--
ALTER TABLE `tr_stock_opname`
  ADD PRIMARY KEY (`opnameId`),
  ADD KEY `warehouseId` (`warehouseId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `tr_stock_opname_item`
--
ALTER TABLE `tr_stock_opname_item`
  ADD PRIMARY KEY (`opnameItemId`),
  ADD KEY `opnameId` (`opnameId`),
  ADD KEY `productBatchId` (`productBatchId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ms_role`
--
ALTER TABLE `ms_role`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ms_setting`
--
ALTER TABLE `ms_setting`
  MODIFY `settingId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ms_address`
--
ALTER TABLE `ms_address`
  ADD CONSTRAINT `ms_address_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_corporate`
--
ALTER TABLE `ms_corporate`
  ADD CONSTRAINT `ms_corporate_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_customer`
--
ALTER TABLE `ms_customer`
  ADD CONSTRAINT `ms_customer_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `ms_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_employee`
--
ALTER TABLE `ms_employee`
  ADD CONSTRAINT `ms_employee_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `ms_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ms_employee_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `ms_department` (`departmentId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ms_employee_ibfk_3` FOREIGN KEY (`positionId`) REFERENCES `ms_position` (`positionId`) ON UPDATE CASCADE;

--
-- Constraints for table `ms_product`
--
ALTER TABLE `ms_product`
  ADD CONSTRAINT `ms_product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `ms_category` (`categoryId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ms_product_ibfk_2` FOREIGN KEY (`packagingId`) REFERENCES `ms_packaging` (`packagingId`) ON UPDATE CASCADE;

--
-- Constraints for table `ms_purchase_agreement`
--
ALTER TABLE `ms_purchase_agreement`
  ADD CONSTRAINT `ms_purchase_agreement_ibfk_1` FOREIGN KEY (`corporateId`) REFERENCES `ms_corporate` (`corporateId`) ON UPDATE CASCADE;

--
-- Constraints for table `ms_purchase_agreement_item`
--
ALTER TABLE `ms_purchase_agreement_item`
  ADD CONSTRAINT `fk_pa_item_product` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ms_purchase_agreement_item_ibfk_1` FOREIGN KEY (`agreementId`) REFERENCES `ms_purchase_agreement` (`agreementId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_retail`
--
ALTER TABLE `ms_retail`
  ADD CONSTRAINT `ms_retail_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_user`
--
ALTER TABLE `ms_user`
  ADD CONSTRAINT `ms_user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `ms_role` (`roleId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_cart`
--
ALTER TABLE `tr_cart`
  ADD CONSTRAINT `tr_cart_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tr_cart_item`
--
ALTER TABLE `tr_cart_item`
  ADD CONSTRAINT `tr_cart_item_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `tr_cart` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_cart_item_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_material_batch`
--
ALTER TABLE `tr_material_batch`
  ADD CONSTRAINT `tr_material_batch_ibfk_1` FOREIGN KEY (`materialId`) REFERENCES `ms_material` (`materialId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_material_batch_ibfk_2` FOREIGN KEY (`warehouseId`) REFERENCES `ms_warehouse` (`warehouseId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_notification`
--
ALTER TABLE `tr_notification`
  ADD CONSTRAINT `tr_notification_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `ms_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tr_order`
--
ALTER TABLE `tr_order`
  ADD CONSTRAINT `tr_order_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_ibfk_2` FOREIGN KEY (`addressId`) REFERENCES `ms_address` (`addressId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_ibfk_3` FOREIGN KEY (`taxId`) REFERENCES `ms_tax` (`taxId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_ibfk_4` FOREIGN KEY (`channelId`) REFERENCES `ms_sales_channel` (`channelId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_ibfk_5` FOREIGN KEY (`agreementId`) REFERENCES `ms_purchase_agreement` (`agreementId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tr_order_item`
--
ALTER TABLE `tr_order_item`
  ADD CONSTRAINT `tr_order_item_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_item_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_order_promo`
--
ALTER TABLE `tr_order_promo`
  ADD CONSTRAINT `tr_order_promo_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_promo_ibfk_2` FOREIGN KEY (`promotionId`) REFERENCES `ms_promotion` (`promotionId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_payment`
--
ALTER TABLE `tr_payment`
  ADD CONSTRAINT `tr_payment_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_payment_ibfk_2` FOREIGN KEY (`paymentMethodId`) REFERENCES `ms_payment_method` (`paymentMethodId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_procurement`
--
ALTER TABLE `tr_procurement`
  ADD CONSTRAINT `tr_procurement_ibfk_1` FOREIGN KEY (`supplierId`) REFERENCES `ms_supplier` (`supplierId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_procurement_item`
--
ALTER TABLE `tr_procurement_item`
  ADD CONSTRAINT `tr_procurement_item_ibfk_1` FOREIGN KEY (`procurementId`) REFERENCES `tr_procurement` (`procurementId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_procurement_item_ibfk_2` FOREIGN KEY (`materialId`) REFERENCES `ms_material` (`materialId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_production_material_usage`
--
ALTER TABLE `tr_production_material_usage`
  ADD CONSTRAINT `tr_production_material_usage_ibfk_1` FOREIGN KEY (`productionOrderId`) REFERENCES `tr_production_order` (`productionOrderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_production_material_usage_ibfk_2` FOREIGN KEY (`materialBatchId`) REFERENCES `tr_material_batch` (`materialBatchId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_production_order`
--
ALTER TABLE `tr_production_order`
  ADD CONSTRAINT `tr_production_order_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `ms_employee` (`employeeId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_production_result`
--
ALTER TABLE `tr_production_result`
  ADD CONSTRAINT `tr_production_result_ibfk_1` FOREIGN KEY (`productionOrderId`) REFERENCES `tr_production_order` (`productionOrderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_production_result_ibfk_2` FOREIGN KEY (`productBatchId`) REFERENCES `tr_product_batch` (`productBatchId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_product_batch`
--
ALTER TABLE `tr_product_batch`
  ADD CONSTRAINT `tr_product_batch_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_product_batch_ibfk_2` FOREIGN KEY (`warehouseId`) REFERENCES `ms_warehouse` (`warehouseId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_product_review`
--
ALTER TABLE `tr_product_review`
  ADD CONSTRAINT `tr_product_review_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_product_review_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_product_review_ibfk_3` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tr_product_stock_movement`
--
ALTER TABLE `tr_product_stock_movement`
  ADD CONSTRAINT `tr_product_stock_movement_ibfk_1` FOREIGN KEY (`productBatchId`) REFERENCES `tr_product_batch` (`productBatchId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_product_stock_movement_ibfk_2` FOREIGN KEY (`warehouseId`) REFERENCES `ms_warehouse` (`warehouseId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_return`
--
ALTER TABLE `tr_return`
  ADD CONSTRAINT `tr_return_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_return_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_return_ibfk_3` FOREIGN KEY (`employeeId`) REFERENCES `ms_employee` (`employeeId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tr_return_item`
--
ALTER TABLE `tr_return_item`
  ADD CONSTRAINT `tr_return_item_ibfk_1` FOREIGN KEY (`returnId`) REFERENCES `tr_return` (`returnId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_return_item_ibfk_2` FOREIGN KEY (`orderItemId`) REFERENCES `tr_order_item` (`orderItemId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_shipment`
--
ALTER TABLE `tr_shipment`
  ADD CONSTRAINT `tr_shipment_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_shipment_ibfk_2` FOREIGN KEY (`expeditionId`) REFERENCES `ms_expedition` (`expeditionId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_stock_opname`
--
ALTER TABLE `tr_stock_opname`
  ADD CONSTRAINT `tr_stock_opname_ibfk_1` FOREIGN KEY (`warehouseId`) REFERENCES `ms_warehouse` (`warehouseId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_stock_opname_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `ms_employee` (`employeeId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_stock_opname_item`
--
ALTER TABLE `tr_stock_opname_item`
  ADD CONSTRAINT `tr_stock_opname_item_ibfk_1` FOREIGN KEY (`opnameId`) REFERENCES `tr_stock_opname` (`opnameId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_stock_opname_item_ibfk_2` FOREIGN KEY (`productBatchId`) REFERENCES `tr_product_batch` (`productBatchId`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
