// @ts-check
const key = "employees";

/**
 * @typedef Employee
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} role
 * @property {string} dob
 * @property {string} password
 */

/**
 *
 * @returns {Promise<Employee[]>}
 */
async function findAll() {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return [];
  }
}

/**
 *
 * @param {Omit<Employee, 'id'>} employee
 */
async function addEmployee(employee) {
  const id = Date.now();
  const employeeObject = { ...employee, id };
  const employees = await findAll();
  employees.push(employeeObject);
  localStorage.setItem(key, JSON.stringify(employees));

  return employeeObject;
}

/**
 *
 * @param {Partial<Employee>} criteria
 */
async function findBy(criteria) {
  const employees = await findAll();
  const criteriaKeys = criteria ? Object.keys(criteria) : [];
  if (!criteriaKeys.length) throw new Error("Criteria is required!");

  return employees.find((emp) =>
    criteriaKeys.every((cKey) => criteria[cKey] === emp[cKey])
  );
}

export default {
    findAll,
    findBy,
    addEmployee
}
