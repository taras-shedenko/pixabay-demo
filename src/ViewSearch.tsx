interface ViewSearchProps {
  viewSearch: () => void;
}

export const ViewSearch = ({ viewSearch }: ViewSearchProps) => (
  <div className="app-header app-header-shrunk">
    <button type="button" onClick={viewSearch}>
      Back to search
    </button>
  </div>
);

export default ViewSearch;
