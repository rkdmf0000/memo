import { kindOfRepayment } from "@/.../loanCalculate/type";
import { diffDays, feeCalculate, ivCalc, ivsCalc } from "@/.../loanCalculate/simulate";



//분배시작일
const startDate = "2023-3-28";

//분배종료일
const endDate = "2024-3-22";

//투자금
const principal = (10000);

//금리
const interestRate = (18);

//소득세
const incomeTax = (14);

//지방세
const localTax = (1.4);

//분배 기준일
const repaymentDay = (-1);


console.clear();
{
    let xt = new Date().getTime();

    const result1 = ivsCalc({
        startDate: startDate,
        endDate: endDate,
        principal: principal,
        repaymentType: kindOfRepayment.BULLET,
        incomeTax: incomeTax,
        localTax: localTax,
        interestRate: interestRate,
        repaymentDay: repaymentDay
    });


    console.log("[실행시간]만기일시상환 : ", new Date().getTime() - xt, "ms");
    xt = new Date().getTime();

    const result2 = ivsCalc({
        startDate: startDate,
        endDate: endDate,
        principal: principal,
        repaymentType: kindOfRepayment.EQUAL_PRINCIPAL,
        incomeTax: incomeTax,
        localTax: localTax,
        interestRate: interestRate,
        repaymentDay: repaymentDay
    });

    console.log("[실행시간]원금균등상환 : ", new Date().getTime() - xt, "ms");
    xt = new Date().getTime();

    const result3 = ivsCalc({
        startDate: startDate,
        endDate: endDate,
        principal: principal,
        repaymentType: kindOfRepayment.EQUAL_PNI,
        incomeTax: incomeTax,
        localTax: localTax,
        interestRate: interestRate,
        repaymentDay: repaymentDay
    });

    console.log("[실행시간]원리금균등상환 : ", new Date().getTime() - xt, "ms");
    xt = new Date().getTime();

    const result4PickRount = ivCalc({
        startDate: startDate,
        endDate: endDate,
        principal: principal,
        repaymentType: kindOfRepayment.EQUAL_PNI,
        incomeTax: incomeTax,
        localTax: localTax,
        interestRate: interestRate,
        repaymentDay: repaymentDay
    }, 4);

    console.log("[실행시간]원리금균등상환 5회차만 추출 : ", new Date().getTime() - xt, "ms");
    xt = new Date().getTime();

    const result4PickRountButNULL = ivCalc({
        startDate: startDate,
        endDate: endDate,
        principal: principal,
        repaymentType: kindOfRepayment.EQUAL_PNI,
        incomeTax: incomeTax,
        localTax: localTax,
        interestRate: interestRate,
        repaymentDay: repaymentDay
    }, 998);

    console.log("[실행시간]원리금균등상환 999회차만 추출 : ", new Date().getTime() - xt, "ms");
    xt = new Date().getTime();

    const platformFeeFormula = "A*(F/A)";
    const platformFeeAmount = feeCalculate({
        structuralFormulaString: platformFeeFormula,
        values: {
            investPrincipalAmount: (principal),
            leftPrincipalAmount: (principal),
            daysBetween: (diffDays(startDate, endDate)),
        }
    });

    console.log("[실행시간]수수료계산 : ", new Date().getTime() - xt, "ms");


    console.log("###########################################################");
    console.log("플랫폼 수수료 금액 : ", platformFeeAmount.toString(), " / 적용 식 : ", platformFeeFormula);
    console.log("만기일시상환 : ", result1);
    console.log("원금균등상환 : ", result2);
    console.log("원리금균등상환 : ", result3);
    console.log("원리금균등상환 5회차 추출 결과 : ", result4PickRount);
    console.log("원리금균등상환 999회차 추출 결과 : ", result4PickRountButNULL);
    
}
