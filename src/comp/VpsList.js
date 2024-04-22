const VpsTable = ({ vpsList }) => `
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Slug</th>
          <th>Display Name</th>
          <th>Hostname</th>
          <th>Status</th>
          <th>IP Address</th>
          <th>Region</th>
          <!-- Add more headers for other fields here -->
        </tr>
      </thead>
      <tbody>
        ${vpsList
          .map(
            (vps) => `
          <tr>
            <td>${vps.id}</td>
            <td>${vps.slug}</td>
            <td>${vps.display_name}</td>
            <td>${vps.hostname}</td>
            <td>${vps.status}</td>
            <td>${vps.ip_address}</td>
            <td>${vps.region}</td>
            <!-- Add more cells for other fields here -->
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
`;

export default VpsTable; // Export the VpsTable component
